'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TicketSelection({ 
  eventId, 
  selectedSection 
}: { 
  eventId: string, 
  selectedSection: string | null 
}) {
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // In production, fetch these from DB grouped by section.
  // For now, static example.
  const sections = [
    { label: 'Sec 216 · Row 4', price: 34.45, available: 12 },
    { label: 'Sec 216 · Row 5', price: 34.45, available: 8 },
    { label: 'Sec 217 · Row 2', price: 49.00, available: 5 },
    { label: 'VIP Package', price: 120.00, available: 3 },
  ]

  const handleReserve = async () => {
    if (!name || !email || !phone) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, name, email, phone }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to reserve')
      router.push(`/confirmation?ticket=${data.ticketNo}&event=${eventId}`)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="space-y-3">
        {sections.map((sec, idx) => {
          const isSelected = selectedSection === sec.label
          return (
            <div 
              key={idx} 
              className={`flex items-center justify-between border rounded-lg p-4 transition ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div>
                <p className="font-medium">{sec.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{sec.available} available</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">${sec.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500">
                  {isSelected ? '✓ Selected' : ''}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700"
          />
          <div className="flex items-center gap-4">
            <label className="font-medium">Quantity:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700"
            >
              {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <button
            onClick={handleReserve}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Reserving...' : 'Reserve Tickets'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By continuing, you agree to our terms of use.
          </p>
        </div>
      </div>
    </div>
  )
}