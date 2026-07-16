import { prisma } from '@/app/lib/prisma'
import { getSession, isAnyAdmin } from '@/app/lib/auth'
import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/app/lib/resend'
import { Status, PaymentStatus } from '@prisma/client'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session || !session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const email = session.user.email
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isAnyAdmin(email)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const formData = await req.formData()
  const ticketId = formData.get('ticketId') as string
  if (!ticketId) {
    return NextResponse.json({ error: 'Missing ticket ID' }, { status: 400 })
  }

  // Use transaction to update ticket and user
  const result = await prisma.$transaction(async (tx) => {
    // 1. Update ticket with verification info
    const ticket = await tx.ticket.update({
      where: { id: ticketId },
      data: {
        status: Status.SOLD,
        paymentStatus: PaymentStatus.PAID,
        purchasedAt: new Date(),
        // Store who verified and when
        verifiedBy: email,
        verifiedAt: new Date(),
        approvedBy: email,
        approvedAt: new Date(),
      },
      include: { event: true },
    })

    // 2. If ticket has purchaser email, update the user
    if (ticket.purchaserEmail) {
      const user = await tx.user.findUnique({
        where: { email: ticket.purchaserEmail },
      })
      
      if (user) {
        // Link user to ticket if not already linked
        if (!ticket.userId) {
          await tx.ticket.update({
            where: { id: ticket.id },
            data: { userId: user.id },
          })
        }
        
        // Update user's last purchase timestamp (if verification is after purchase)
        // Only update if the user's lastPurchaseAt is null or older than this verification
        if (!user.lastPurchaseAt || user.lastPurchaseAt < new Date()) {
          await tx.user.update({
            where: { id: user.id },
            data: {
              lastPurchaseAt: new Date(),
              // totalTickets is already incremented during purchase, but just in case
              totalTickets: { increment: 0 }, // No-op, already incremented
            },
          })
        }
      }
    }

    return ticket
  })

  // Send confirmation email to buyer
  if (result.purchaserEmail) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: result.purchaserEmail,
      subject: `✅ Ticket Confirmed: ${result.event.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Your ticket is confirmed!</h2>
          <p><strong>Event:</strong> ${result.event.title}</p>
          <p><strong>Date:</strong> ${new Date(result.event.date).toLocaleString()}</p>
          <p><strong>Ticket No:</strong> ${result.ticketNo}</p>
          <p><strong>Verified by:</strong> ${email}</p>
          <p>Thank you for your payment. We look forward to seeing you!</p>
        </div>
      `,
    })
  }

  // Redirect back to the tickets page
  return NextResponse.redirect(new URL('/admin/tickets', req.url))
}