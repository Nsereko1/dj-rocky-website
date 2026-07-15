'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CancelButton({ ticketId }: { ticketId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    if (!confirm('Cancel this reservation? The ticket will become available again.')) return

    setLoading(true)
    try {
      const res = await fetch('/api/tickets/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to cancel')
        return
      }
      router.refresh()
    } catch (err) {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition disabled:opacity-50 whitespace-nowrap"
    >
      {loading ? '...' : 'Cancel'}
    </button>
  )
}