'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FixTicketButton({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleFix = async () => {
    if (!confirm('Add missing tickets to reach capacity?')) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`/api/events/${eventId}/fix-tickets`, {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setMessage(`✅ ${data.message}`)
      router.refresh()
    } catch (err) {
      setMessage('❌ ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-2">
      <button
        onClick={handleFix}
        disabled={loading}
        className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition disabled:opacity-50"
      >
        {loading ? 'Fixing...' : '🔧 Fix Ticket Count'}
      </button>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  )
}