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
      replyTo: REPLY_TO,          // ✅ camelCase
      to: email,
      subject: `🎫 Ticket Reserved: ${ticket.event.title}`,
      html: `... your html ...`,
    })

    // --- 2. Send admin notification ---
    await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,          // ✅ camelCase
      to: adminEmail,
      subject: `📝 New Ticket Reservation: ${ticket.event.title}`,
      html: `... your html ...`,
    })

    return NextResponse.json({ ticketNo: ticket.ticketNo, eventId: ticket.eventId })
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }
}