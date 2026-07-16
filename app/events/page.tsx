import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    include: { tickets: { where: { status: 'AVAILABLE' } } },
  })

  // Helper function to format date range - keep the time as stored in database
  const formatEventDate = (event: any) => {
    const start = new Date(event.startDate || event.date)
    const end = event.endDate ? new Date(event.endDate) : null
    
    // Use UTC to prevent timezone conversion
    const startDateStr = start.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'UTC'
    })
    
    const startTimeStr = start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    })
    
    if (end) {
      const endTimeStr = end.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
      })
      return `${startDateStr}, ${startTimeStr} - ${endTimeStr}`
    }
    
    return `${startDateStr}, ${startTimeStr}`
  }

  return (
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
      <div className="grid gap-6">
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events yet. Check back soon!</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
              {/* Event Flyer/Image - displayed at the top */}
              {event.image && (
                <div className="relative w-full h-64 md:h-80 lg:h-96">
                  <Image
                    src={event.image}
                    alt={`${event.title} flyer`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              
              {/* Event Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <div className="space-y-1 text-gray-600 dark:text-gray-300">
                  <p>📅 {formatEventDate(event)}</p>
                  <p>📍 {event.venue}</p>
                  <p>🎫 Available tickets: {event.tickets.length}</p>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded mt-3 transition"
                >
                  Book Tickets
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}