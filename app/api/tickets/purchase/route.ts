import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/app/lib/resend'
import { Status, PaymentStatus } from '@prisma/client'

// Get reply-to from env or use fallback
const REPLY_TO = process.env.RESEND_REPLY_TO || 'djrockypromo@gmail.com'

export async function POST(req: Request) {
  const { eventId, name, email, phone } = await req.json()

  if (!eventId || !name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    // Transaction to reserve the ticket
    const ticket = await prisma.$transaction(async (tx) => {
      const available = await tx.ticket.findFirst({
        where: { eventId, status: Status.AVAILABLE },
        include: { event: true },
      })
      if (!available) throw new Error('No tickets available')

      const updated = await tx.ticket.update({
        where: { id: available.id },
        data: {
          status: Status.RESERVED,
          paymentStatus: PaymentStatus.RESERVED,
          purchaserName: name,
          purchaserEmail: email,
          purchaserPhone: phone,
          purchasedAt: new Date(),
        },
        include: { event: true },
      })
      return updated
    })

    const adminEmail = process.env.ADMIN_EMAILS?.split(',')[0] || 'djrockyug@gmail.com'

    // --- 1. Send reservation email to buyer ---
    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,          // ✅ camelCase – accepted by Resend v3+
      to: email,
      subject: `🎫 Ticket Reserved: ${ticket.event.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thank you, ${name}!</h2>
          <p>Your ticket has been <strong>reserved</strong> for:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Event:</strong> ${ticket.event.title}</li>
            <li><strong>Date:</strong> ${new Date(ticket.event.date).toLocaleString()}</li>
            <li><strong>Venue:</strong> ${ticket.event.venue}</li>
          </ul>
          <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; text-align: center; margin: 1.5rem 0;">
            <p style="margin: 0; font-size: 0.9rem; color: #555;">Your ticket number</p>
            <p style="margin: 0; font-size: 2rem; font-weight: bold; letter-spacing: 2px; color: #111;">
              ${ticket.ticketNo}
            </p>
          </div>
          <p><strong>Next steps:</strong></p>
          <ul style="padding-left: 1.5rem;">
            <li>We will call you at <strong>${phone}</strong> to confirm payment.</li>
            <li>You can also send mobile money to <strong>+256 703 587 550</strong> (DJ Rocky).</li>
            <li>Once payment is received, your ticket will be confirmed and you'll get a confirmation email.</li>
          </ul>
          <p style="margin-top: 1.5rem;">If you have any questions, just reply to this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 1.5rem 0;" />
          <p style="font-size: 0.8rem; color: #888;">
            Reserved by: ${name} (${email})<br />
            Phone: ${phone}
          </p>
        </div>
      `,
    })

    // --- 2. Send admin notification (new reservation) ---
    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: adminEmail,
      subject: `📝 New Ticket Reservation: ${ticket.event.title}`,
      html: `
        <h2>📝 New Ticket Reserved</h2>
        <p><strong>Event:</strong> ${ticket.event.title}</p>
        <p><strong>Ticket No:</strong> ${ticket.ticketNo}</p>
        <p><strong>Buyer:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Reserved at:</strong> ${new Date().toLocaleString()}</p>
        <p><a href="${process.env.NEXTAUTH_URL}/admin/tickets">View all reservations</a></p>
      `,
    })

    return NextResponse.json({ ticketNo: ticket.ticketNo, eventId: ticket.eventId })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}