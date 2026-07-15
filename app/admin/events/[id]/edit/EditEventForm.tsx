'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditEventForm({ event }: { event: any }) {
  const router = useRouter()
  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(event.description || '')
  const [startDate, setStartDate] = useState(event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '')
  const [endDate, setEndDate] = useState(event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '')
  const [venue, setVenue] = useState(event.venue)
  const [capacity, setCapacity] = useState(event.capacity)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, startDate, endDate, venue, capacity }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update')
      }
      router.push('/admin/events')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-medium">Start Date & Time</label>
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-medium">End Date & Time (optional)</label>
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-medium">Venue</label>
        <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-medium">Capacity</label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} min={1} required className="w-full border p-2 rounded" />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded w-full disabled:opacity-50">
        {loading ? 'Updating...' : 'Update Event'}
      </button>
    </form>
  )
}