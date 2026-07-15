import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    include: { tickets: { where: { status: 'AVAILABLE' } } },
  })

  return (
    // Added pt-20 to push content below the fixed navbar
    <div className="container mx-auto p-4 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Shows</h1>
        <div className="space-x-4">
          <Link
            href="/admin/events/new"
            className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition"
          >
            Admin
          </Link>
          <Link
            href="/verify"
            className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-500 transition"
          >
            Verify
          </Link>
        </div>
      </div>
      <div className="grid gap-4">
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events yet. Check back soon!</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="border rounded p-4 shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{new Date(event.date).toLocaleString()}</p>
              <p>{event.venue}</p>
              <p>Available tickets: {event.tickets.length}</p>
              <Link
                href={`/events/${event.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded inline-block mt-2"
              >
                Buy Tickets
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}