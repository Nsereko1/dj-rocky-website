import { prisma } from '@/app/lib/prisma'
import { resend, FROM_EMAIL } from '@/app/lib/resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { ticketNo, requesterEmail, requesterPhone } = await req.json()

  if (!ticketNo || !requesterEmail) {
    return NextResponse.json({ error: 'Ticket number and requester email required' }, { status: 400 })
  }

  const ticket = await prisma.ticket.findUnique({
    where: { ticketNo },
    include: { event: true },
  })

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
  }

  // Only allow request if ticket is RESERVED or SOLD
  if (ticket.status !== 'RESERVED' && ticket.status !== 'SOLD') {
    return NextResponse.json({ error: 'Ticket is not reserved or sold' }, { status: 400 })
  }

  const adminEmail = process.env.ADMIN_EMAILS?.split(',')[0] || 'djrockyug@gmail.com'
  const buyerEmail = ticket.purchaserEmail

  // Prepare email content
  const ticketLink = `${process.env.NEXTAUTH_URL}/verify`
  const baseMessage = `
    Someone has requested contact details for ticket #${ticket.ticketNo}.
    Ticket: ${ticket.event.title} on ${new Date(ticket.event.date).toLocaleString()}
    Requester: ${requesterEmail} ${requesterPhone ? `(Phone: ${requesterPhone})` : ''}
  `

  // Send to admin
  await resend.emails.send({
    from: FROM_EMAIL,
    to: adminEmail,
    subject: `📩 Contact Request for Ticket #${ticket.ticketNo}`,
    html: `
      <h2>Contact Request</h2>
      <p>${baseMessage}</p>
      <p>You can contact the requester directly or the ticket holder if needed.</p>
      <p>Ticket holder email: ${buyerEmail || 'Not available'}</p>
    `,
  })

  // Send to buyer (if email exists)
  if (buyerEmail) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: buyerEmail,
      subject: `📩 Someone wants to contact you about ticket #${ticket.ticketNo}`,
      html: `
        <h2>Contact Request</h2>
        <p>Someone has requested to contact you about your ticket for <strong>${ticket.event.title}</strong>.</p>
        <p>Requester email: ${requesterEmail}</p>
        ${requesterPhone ? `<p>Requester phone: ${requesterPhone}</p>` : ''}
        <p>If you wish to get in touch, you can reply to this email or contact them directly.</p>
        <p>This is an automated notification from DJ Rocky.</p>
      `,
    })
  }

  return NextResponse.json({ success: true })
}