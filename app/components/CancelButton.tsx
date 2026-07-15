'use client'

import { useRouter } from 'next/navigation'

export default function CancelButton({ ticketId }: { ticketId: string }) {
  const router = useRouter()

  const handleCancel = async () => {
    if (!confirm('Cancel this reservation? The ticket will become available again.')) return

    const formData = new FormData()
    formData.append('ticketId', ticketId)

    const res = await fetch('/api/tickets/cancel', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleCancel}
      className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700 transition"
    >
      Cancel
    </button>
  )
}