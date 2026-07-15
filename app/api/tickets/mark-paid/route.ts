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

  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: Status.SOLD,
      paymentStatus: PaymentStatus.PAID,
      purchasedAt: new Date(),
    },
    include: { event: true },
  })

  if (ticket.purchaserEmail) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ticket.purchaserEmail,
      subject: `✅ Ticket Confirmed: ${ticket.event.title}`,
      html: `...`,
    })
  }

  return NextResponse.redirect(new URL('/admin/tickets', req.url))
}