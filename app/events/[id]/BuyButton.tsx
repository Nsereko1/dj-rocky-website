'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BuyButton({ eventId, available }: { eventId: string; available: boolean }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handlePurchase = async () => {
    if (!name) { setError('Please enter your name'); return }
    if (!email) { setError('Please enter your email'); return }
    if (!phone) { setError('Please enter your phone number'); return }

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, name, email, phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Purchase failed')
      router.push(`/confirmation?ticket=${data.ticketNo}&event=${eventId}`)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (!available) return <p className="text-red-500">Sold out</p>

  return (
    <div className="mt-4 max-w-md">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Buy Ticket'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}