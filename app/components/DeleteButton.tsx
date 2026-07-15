'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ ticketId }: { ticketId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Delete this ticket? A new ticket will be generated to keep the total count.')) return

    setLoading(true)
    try {
      const res = await fetch('/api/tickets/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to delete ticket')
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
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition disabled:opacity-50"
    >
      {loading ? '...' : 'Delete'}
    </button>
  )
}