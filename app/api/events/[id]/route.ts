import { prisma } from '@/app/lib/prisma'
import { getSession, isSuperAdmin } from '@/app/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const email = session.user.email
  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!isSuperAdmin(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  const { title, description, startDate, endDate, venue, capacity, image } = await req.json()

  if (!title || !startDate || !venue || !capacity) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title,
      description,
      date: new Date(startDate),
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      venue,
      capacity: parseInt(capacity),
      image: image || null,
    },
  })

  return NextResponse.json(updated)
}
