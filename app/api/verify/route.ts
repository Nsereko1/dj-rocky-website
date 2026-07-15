import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { ticketNo, eventId } = await req.json()

  if (!ticketNo) {
    return NextResponse.json({ valid: false, reason: 'Ticket number required' }, { status: 400 })
  }

  const ticket = await prisma.ticket.findUnique({
    where: { ticketNo },
    include: { event: true },
  })

  if (!ticket) {
    return NextResponse.json({ valid: false, reason: 'Ticket not found' })
  }

  // If eventId provided, check it matches
  if (eventId && ticket.eventId !== eventId) {
    return NextResponse.json({ valid: false, reason: 'Ticket does not belong to this event' })
  }

  return NextResponse.json({
    valid: true,
    ticketNo: ticket.ticketNo,
    status: ticket.status,
    event: {
      title: ticket.event.title,
      date: ticket.event.date,
      venue: ticket.event.venue,
    },
  })
}