import { prisma } from '@/app/lib/prisma'
import { getSession, isSuperAdmin } from '@/app/lib/auth'
import { NextResponse } from 'next/server'
import { generateTicketNumber } from '@/app/lib/ticket-utils'
import { Status } from '@prisma/client'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = session.user.email
  if (!email || !isSuperAdmin(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { ticketId } = await req.json()
  if (!ticketId) {
    return NextResponse.json({ error: 'Missing ticket ID' }, { status: 400 })
  }

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      select: { eventId: true },
    })
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Delete the ticket
    await prisma.ticket.delete({
      where: { id: ticketId },
    })

    // Generate a new unique ticket number
    let newTicketNo = ''
    let attempts = 0
    let isUnique = false
    while (!isUnique && attempts < 100) {
      newTicketNo = generateTicketNumber()
      const existing = await prisma.ticket.findUnique({ where: { ticketNo: newTicketNo } })
      if (!existing) isUnique = true
      attempts++
    }
    if (!isUnique) {
      return NextResponse.json({ error: 'Could not generate unique ticket number' }, { status: 500 })
    }

    // Create replacement ticket with AVAILABLE status
    await prisma.ticket.create({
      data: {
        ticketNo: newTicketNo,
        eventId: ticket.eventId,
        status: Status.AVAILABLE,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete ticket' }, { status: 500 })
  }
}