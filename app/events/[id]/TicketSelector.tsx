'use client'

import TicketSelection from './TicketSelection'

export default function TicketSelector({ eventId }: { eventId: string }) {
  return (
    <div className="max-w-2xl mx-auto">
      <TicketSelection eventId={eventId} />
    </div>
  )
}