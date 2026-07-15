import { prisma } from '@/app/lib/prisma'
import { getSession, isSuperAdmin } from '@/app/lib/auth'
import { NextResponse } from 'next/server'
import { generateTicketNumber } from '@/app/lib/ticket-utils'
import { Status } from '@prisma/client'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = session.user.email
  if (!email || !isSuperAdmin(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 })
  }

  const event = await prisma.event.findUnique({
    where: { id },
    include: { tickets: true },
  })
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 })
  }

  const currentCount = event.tickets.length
  const target = event.capacity
  const needed = target - currentCount

  if (needed <= 0) {
    return NextResponse.json({
      success: true,
      message: 'Ticket count is already at capacity',
      created: 0,
    })
  }

  const ticketsToCreate: { ticketNo: string; eventId: string; status: Status }[] = []
  const usedNumbers = new Set(event.tickets.map(t => t.ticketNo))

  for (let i = 0; i < needed; i++) {
    let ticketNo = ''
    let attempts = 0
    let isUnique = false
    while (!isUnique && attempts < 100) {
      ticketNo = generateTicketNumber()
      if (!usedNumbers.has(ticketNo)) {
        const existing = await prisma.ticket.findUnique({ where: { ticketNo } })
        if (!existing) {
          isUnique = true
          usedNumbers.add(ticketNo)
          ticketsToCreate.push({
            ticketNo,
            eventId: id,
            status: Status.AVAILABLE,
          })
        }
      }
      attempts++
    }
    if (!isUnique) break
  }

  if (ticketsToCreate.length > 0) {
    await prisma.ticket.createMany({
      data: ticketsToCreate,
    })
  }

  return NextResponse.json({
    success: true,
    created: ticketsToCreate.length,
    needed,
    message: `Created ${ticketsToCreate.length} new ticket(s) to reach capacity`,
  })
}