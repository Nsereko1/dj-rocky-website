import { prisma } from '@/app/lib/prisma'
import { getSession, isAnyAdmin, isSuperAdmin } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DeleteButton from '@/app/components/DeleteButton'
import { generateTicketNumber } from '@/app/lib/ticket-utils'
import { Status } from '@prisma/client'  

export default async function EventTicketsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ fixed?: string }>
}) {
  const { id } = await params
  const { fixed } = await searchParams

  const session = await getSession()
  if (!session || !session.user) redirect('/api/auth/signin')
  
  const email = session.user.email
  if (!email) redirect('/api/auth/signin')
  
  if (!isAnyAdmin(email)) redirect('/admin')
  
  const isSuper = isSuperAdmin(email)

  let event = await prisma.event.findUnique({
    where: { id },
    include: { tickets: true },
  })
  if (!event) redirect('/admin/events')

  // Auto-fix ticket count
  if (!fixed && event.tickets.length < event.capacity) {
    const needed = event.capacity - event.tickets.length

    const ticketsToCreate: { ticketNo: string; eventId: string; status: Status }[] = []
    const usedNumbers = new Set(event.tickets.map((t) => t.ticketNo))

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
              eventId: event.id,
              status: Status.AVAILABLE,   // ✅ enum
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

    redirect(`/admin/events/${id}?fixed=1`)
  }

  event = await prisma.event.findUnique({
    where: { id },
    include: { tickets: true },
  })
  if (!event) redirect('/admin/events')

  const stats = {
    total: event.tickets.length,
    available: event.tickets.filter((t) => t.status === Status.AVAILABLE).length,
    reserved: event.tickets.filter((t) => t.status === Status.RESERVED).length,
    sold: event.tickets.filter((t) => t.status === Status.SOLD).length,
  }

  return (
    <div className="container mx-auto p-4 pt-20 max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date(event.date).toLocaleString()} · {event.venue}
          </p>
        </div>
        <Link href="/admin/events" className="text-blue-600 hover:underline">
          ← Back to Events
        </Link>
      </div>

      <div className="flex gap-4 mb-6 text-sm">
        <span>🟢 Available: {stats.available}</span>
        <span>🟡 Reserved: {stats.reserved}</span>
        <span>🔵 Sold: {stats.sold}</span>
        <span>📦 Total: {stats.total}</span>
        {stats.total < event.capacity && (
          <span className="text-yellow-600">⚠️ Needs fixing – auto‑fixed</span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2">Ticket No</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Buyer</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {event.tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="border p-2 font-mono">{ticket.ticketNo}</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.status === Status.AVAILABLE
                        ? 'bg-green-200 text-green-800'
                        : ticket.status === Status.RESERVED
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-blue-200 text-blue-800'
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="border p-2">{ticket.purchaserName || '—'}</td>
                <td className="border p-2">{ticket.purchaserPhone || '—'}</td>
                <td className="border p-2">
                  {isSuper ? <DeleteButton ticketId={ticket.id} /> : <span className="text-gray-400 text-sm">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}