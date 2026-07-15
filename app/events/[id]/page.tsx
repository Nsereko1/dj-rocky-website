import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import TicketSelector from './TicketSelector'

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await prisma.event.findUnique({
    where: { id },
    include: { tickets: { where: { status: 'AVAILABLE' } } },
  })
  if (!event) notFound()

  return (
    <div className="container mx-auto p-4 pt-20 max-w-6xl">
      {/* Event info (server‑rendered) */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="text-gray-600 dark:text-gray-400 mt-2">
          <p>
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })} ·{' '}
            {new Date(event.date).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
          <p>{event.venue}</p>
        </div>
        {event.description && <p className="mt-4 text-gray-700 dark:text-gray-300">{event.description}</p>}
      </div>

      {/* Interactive part (client) */}
      <TicketSelector eventId={event.id} />
    </div>
  )
}