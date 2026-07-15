import { prisma } from '@/app/lib/prisma'
import { generateTicketNumber } from '@/app/lib/ticket-utils'
import { NextResponse } from 'next/server'
import { getSession, isSuperAdmin } from '@/app/lib/auth'
import { Status } from '@prisma/client'   // <-- import enum

export async function POST(req: Request) {
  // 1. Authentication – only super admin can create events
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = session.user.email
  if (!email || !isSuperAdmin(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // 2. Parse and validate input
  const { title, description, date, venue, capacity } = await req.json()

  if (!title || !date || !venue || !capacity) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const capacityNum = parseInt(capacity)
  if (isNaN(capacityNum) || capacityNum < 1) {
    return NextResponse.json({ error: 'Capacity must be a positive integer' }, { status: 400 })
  }

  // 3. Create event
  const event = await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
      venue,
      capacity: capacityNum,
    },
  })

  // 4. Pre‑generate tickets in batches using Status enum
  const total = capacityNum
  const batchSize = 1000
  for (let i = 0; i < total; i += batchSize) {
    const tickets = []
    const usedNumbers = new Set<string>()
    for (let j = 0; j < Math.min(batchSize, total - i); j++) {
      let ticketNo
      let attempts = 0
      do {
        ticketNo = generateTicketNumber()
        attempts++
        if (attempts > 100) throw new Error('Could not generate unique ticket number')
      } while (
        usedNumbers.has(ticketNo) ||
        (await prisma.ticket.findUnique({ where: { ticketNo } }))
      )
      usedNumbers.add(ticketNo)
      tickets.push({
        ticketNo,
        eventId: event.id,
        status: Status.AVAILABLE,   // ✅ use enum
      })
    }
    await prisma.ticket.createMany({ data: tickets })
  }

  return NextResponse.json(event, { status: 201 })
}