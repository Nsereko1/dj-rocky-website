import { prisma } from '@/app/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' },
    include: { tickets: { where: { status: 'AVAILABLE' } } },
  })

  // Helper function to format date range
  const formatEventDate = (event: any) => {
    const start = new Date(event.startDate || event.date)
    const end = event.endDate ? new Date(event.endDate) : null
    
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
      
      <div className="grid gap-8">
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming events yet. Check back soon!</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
              {/* Two-column layout: Flyer on right, Details on left */}
              <div className="flex flex-col md:flex-row">
                {/* Left side - Event Details */}
                <div className="flex-1 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h2>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-2">📅 {formatEventDate(event)}</p>
                    <p className="flex items-center gap-2">📍 {event.venue}</p>
                    <p className="flex items-center gap-2">🎫 Available tickets: {event.tickets.length}</p>
                  </div>
                  {event.description && (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">{event.description}</p>
                  )}
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full mt-6 transition"
                  >
                    Book Tickets
                  </Link>
                </div>
                
                {/* Right side - Flyer/Image */}
                <div className="md:w-96 lg:w-[500px] relative min-h-[300px] md:min-h-full bg-gray-100 dark:bg-gray-700">
                  {event.image ? (
                    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] cursor-pointer group">
                      <Image
                        src={event.image}
                        alt={`${event.title} flyer`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        priority
                      />
                      {/* Overlay with "View Full Size" text */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full">
                          Click to view full size
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[300px] text-gray-400 dark:text-gray-500">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>No flyer uploaded yet</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}