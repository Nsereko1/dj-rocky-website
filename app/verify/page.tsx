'use client'

import { useState } from 'react'

export default function VerifyPage() {
  const [ticketNo, setTicketNo] = useState('')
  const [eventId, setEventId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | {
    valid: boolean
    reason?: string
    event?: { title: string; date: string; venue: string }
    status?: string
    ticketNo?: string
  }>(null)

  // Request contact state
  const [requesterEmail, setRequesterEmail] = useState('')
  const [requesterPhone, setRequesterPhone] = useState('')
  const [requestSent, setRequestSent] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketNo, eventId: eventId || undefined }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ valid: false, reason: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  const handleRequestContact = async () => {
    if (!requesterEmail) {
      alert('Please provide your email address')
      return
    }
    setRequestLoading(true)
    try {
      const res = await fetch('/api/verify/request-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketNo,
          requesterEmail,
          requesterPhone: requesterPhone || 'Not provided',
        }),
      })
      if (res.ok) {
        setRequestSent(true)
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to send request')
      }
    } catch (error) {
      alert('Network error')
    } finally {
      setRequestLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Verify Ticket</h1>

        <form onSubmit={handleVerify} className="space-y-3">
          <input
            type="text"
            placeholder="10‑digit ticket number"
            value={ticketNo}
            onChange={(e) => setTicketNo(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Event ID (optional)"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            {!result.valid ? (
              <p className="text-red-600">❌ {result.reason}</p>
            ) : (
              <>
                <p className="text-green-600 font-bold">✅ Valid Ticket</p>
                <div className="mt-2 text-sm">
                  <p><strong>Event:</strong> {result.event?.title}</p>
                  <p><strong>Date:</strong> {new Date(result.event?.date || '').toLocaleString()}</p>
                  <p><strong>Venue:</strong> {result.event?.venue}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                      result.status === 'AVAILABLE' ? 'bg-green-200 text-green-800' :
                      result.status === 'RESERVED' ? 'bg-yellow-200 text-yellow-800' :
                      result.status === 'SOLD' ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {result.status}
                    </span>
                  </p>
                </div>

                {/* Request Contact - only for reserved/sold tickets */}
                {(result.status === 'RESERVED' || result.status === 'SOLD') && (
                  <div className="mt-4 pt-4 border-t">
                    {requestSent ? (
                      <p className="text-green-600 text-center">
                        ✅ Request sent! The ticket owner has been notified.
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          To contact the ticket holder, please provide your email and phone (optional).
                        </p>
                        <input
                          type="email"
                          placeholder="Your email *"
                          value={requesterEmail}
                          onChange={(e) => setRequesterEmail(e.target.value)}
                          className="w-full p-2 border rounded mb-2"
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Your phone (optional)"
                          value={requesterPhone}
                          onChange={(e) => setRequesterPhone(e.target.value)}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <button
                          onClick={handleRequestContact}
                          disabled={requestLoading}
                          className="w-full bg-yellow-600 text-white py-2 rounded font-bold hover:bg-yellow-700 transition disabled:opacity-50"
                        >
                          {requestLoading ? 'Sending...' : '📩 Request Contact Details'}
                        </button>
                      </>
                    )}
                  </div>
                )}

                {result.status === 'AVAILABLE' && (
                  <p className="mt-4 text-sm text-gray-500">
                    This ticket is available for purchase. No contact details needed.
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}