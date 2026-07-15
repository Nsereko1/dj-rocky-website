'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

function AdminContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [capacity, setCapacity] = useState(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect non‑super admins to dashboard
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      const superAdmins = (process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAILS || '')
        .split(',')
        .map(e => e.trim())
      if (!superAdmins.includes(session.user.email)) {
        router.push('/admin')
      }
    }
  }, [status, session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, date, venue, capacity }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create event')
      }
      router.push('/events')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p>Loading...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
          <p className="mb-4 text-gray-600">Sign in with your Google account to manage events.</p>
          <button
            onClick={() => signIn('google')}
            className="bg-white text-gray-800 border border-gray-300 px-6 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition w-full"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 pt-20 max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Create New Event</h1>
        <button
          onClick={() => signOut()}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Date & Time</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Venue</label>
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            min={1}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Event & Generate Tickets'}
        </button>
      </form>
    </div>
  )
}

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminContent />
    </SessionProvider>
  )
}