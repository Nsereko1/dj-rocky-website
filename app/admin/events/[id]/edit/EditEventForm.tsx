'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function EditEventForm({ event }: { event: any }) {
  const router = useRouter()
  const [title, setTitle] = useState(event.title)
  const [description, setDescription] = useState(event.description || '')
  const [startDate, setStartDate] = useState(event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '')
  const [endDate, setEndDate] = useState(event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '')
  const [venue, setVenue] = useState(event.venue)
  const [capacity, setCapacity] = useState(event.capacity)
  const [image, setImage] = useState(event.image || '')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG, WEBP, or GIF)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5MB')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('eventId', event.id)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        setImage(data.url)
        alert('Flyer uploaded successfully!')
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!confirm('Remove this flyer?')) return
    
    try {
      const res = await fetch(`/api/events/${event.id}/image`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setImage('')
        alert('Flyer removed successfully!')
      } else {
        alert('Failed to remove flyer')
      }
    } catch (error) {
      alert('Failed to remove flyer')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          description, 
          startDate, 
          endDate, 
          venue, 
          capacity,
          image
        }),
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
      <div className="border-2 border-dashed border-purple-400 dark:border-purple-600 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/10">
        <label className="block font-bold mb-2 text-purple-700 dark:text-purple-300">
          🖼️ Event Flyer / Poster
        </label>
        
        {image && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image src={image} alt="Event flyer" fill className="object-contain" />
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-600 file:text-white
              hover:file:bg-purple-700
              file:cursor-pointer"
          />
          {uploading && <span className="text-sm text-purple-600">⏳ Uploading...</span>}
        </div>
        
        {image && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="mt-2 text-sm text-red-600 hover:text-red-700"
          >
            🗑️ Remove Flyer
          </button>
        )}
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Recommended: JPG, PNG, or WEBP • Max 5MB • 1200x800px or larger
        </p>
      </div>

      <div>
        <label className="block font-medium">Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
        />
      </div>
      
      <div>
        <label className="block font-medium">Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
          rows={3}
        />
      </div>
      
      <div>
        <label className="block font-medium">Start Date & Time</label>
        <input 
          type="datetime-local" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          required 
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
        />
      </div>
      
      <div>
        <label className="block font-medium">End Date & Time (optional)</label>
        <input 
          type="datetime-local" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
        />
      </div>
      
      <div>
        <label className="block font-medium">Venue</label>
        <input 
          type="text" 
          value={venue} 
          onChange={(e) => setVenue(e.target.value)} 
          required 
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
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
          className="w-full border p-2 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
        />
      </div>
      
      {error && <p className="text-red-500">{error}</p>}
      
      <button 
        type="submit" 
        disabled={loading || uploading} 
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded w-full disabled:opacity-50 transition"
      >
        {loading ? 'Updating...' : 'Update Event'}
      </button>
    </form>
  )
}
