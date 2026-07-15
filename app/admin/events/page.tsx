import { prisma } from '@/app/lib/prisma'
import { getSession, isAnyAdmin, isSuperAdmin } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminEventsPage() {
    const session = await getSession()
if (!session || !session.user) redirect('/api/auth/signin')

const email = session.user.email
if (!email) redirect('/api/auth/signin')

if (!isAnyAdmin(email)) redirect('/admin')

const isSuper = isSuperAdmin(email)

  const events = await prisma.event.findMany({
    include: {
      tickets: true,
    },
    orderBy: { date: 'asc' }, // keeping original order
  })

  return (
    <div className="container mx-auto p-4 pt-20 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Events</h1>
        {isSuper && (
          <Link
            href="/admin/events/new"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create New
          </Link>
        )}
      </div>

      <div className="grid gap-4">
        {events.length === 0 ? (
          <p className="text-gray-500">No events yet. {isSuper && <Link href="/admin/events/new" className="text-blue-600 hover:underline">Create one</Link>}.</p>
        ) : (
          events.map((event) => {
            const total = event.tickets.length
            const available = event.tickets.filter(t => t.status === 'AVAILABLE').length
            const reserved = event.tickets.filter(t => t.status === 'RESERVED').length
            const sold = event.tickets.filter(t => t.status === 'SOLD').length

            // Build date display: startDate if exists, else date
            let dateDisplay = ''
            if (event.startDate) {
              dateDisplay = new Date(event.startDate).toLocaleDateString()
              if (event.endDate) {
                dateDisplay += ' – ' + new Date(event.endDate).toLocaleDateString()
              }
            } else {
              dateDisplay = new Date(event.date).toLocaleDateString()
            }

            return (
              <div key={event.id} className="border dark:border-gray-700 rounded-lg p-4 hover:shadow transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dateDisplay} · {event.venue}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded text-sm hover:bg-gray-700"
                    >
                      View Tickets
                    </Link>
                    {isSuper && (
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700"
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>🟢 Available: {available}</span>
                  <span>🟡 Reserved: {reserved}</span>
                  <span>🔵 Sold: {sold}</span>
                  <span>📦 Total: {total}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}