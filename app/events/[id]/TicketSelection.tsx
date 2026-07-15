// /Users/rocky/Documents/dj-rocky-website-main/app/events/[id]/TicketSelection.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TicketSelection({ eventId }: { eventId: string }) {
  const [quantity, setQuantity] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [ticketType, setTicketType] = useState('Standard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // Ticket pricing in UGX
  const ticketPrices = {
    Standard: 50000,
    'Group of 3': 120000,
    VIP: 100000,
  }

  const formatUGX = (amount: number) => {
    return amount.toLocaleString('en-UG') + ' UGX'
  }

  // Helper function to get price safely
  const getPrice = (type: string): number => {
    return ticketPrices[type as keyof typeof ticketPrices] || 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !phone) {
      setError('Please fill in all fields')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      const res = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          eventId, 
          name, 
          email, 
          phone, 
          quantity,
          ticketType 
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to book ticket')
      
      setSuccess(true)
      setTimeout(() => {
        router.push(`/confirmation?ticket=${data.ticketNo}&event=${eventId}`)
      }, 1500)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  // Calculate total price safely
  const totalPrice = getPrice(ticketType) * quantity

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Book Your Ticket</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Ticket Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ticket Type
          </label>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="Standard">Standard - {formatUGX(ticketPrices.Standard)}</option>
            <option value="Group of 3">Group of 3 - {formatUGX(ticketPrices['Group of 3'])}</option>
            <option value="VIP">VIP - {formatUGX(ticketPrices.VIP)}</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Quantity
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Total Price */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300">Total:</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatUGX(totalPrice)}
            </span>
          </div>
        </div>

        {/* Book Ticket Button with White Outline - stays white on hover */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 text-lg font-bold rounded-lg transition transform ${
            loading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-white hover:shadow-lg hover:scale-[1.02]'
          }`}
        >
          {loading ? 'Processing...' : '🎫 Book Ticket'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 rounded-lg text-center">
            ❌ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 rounded-lg text-center">
            ✅ Ticket booked successfully! Redirecting...
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          By continuing, you agree to our terms of use.
        </p>
      </form>
    </div>
  )
}