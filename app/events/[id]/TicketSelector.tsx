'use client'

import { useState } from 'react'
import VenueMap from '@/app/components/VenueMap'
import TicketSelection from './TicketSelection'

export default function TicketSelector({ eventId }: { eventId: string }) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT: Venue Map */}
      <div>
        <VenueMap 
          selectedSection={selectedSection} 
          onSelectSection={setSelectedSection} 
        />
      </div>

      {/* RIGHT: Ticket List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Tickets</h2>
        <TicketSelection 
          eventId={eventId} 
          selectedSection={selectedSection} 
        />
      </div>
    </div>
  )
}