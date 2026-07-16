import { getSession, isSuperAdmin } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
    const session = await getSession()
if (!session || !session.user) redirect('/api/auth/signin')

const email = session.user.email
if (!email) redirect('/api/auth/signin')

const isSuper = isSuperAdmin(email)

  return (
    <div className="container mx-auto p-4 pt-20 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Event Card - only for super admin */}
        {isSuper && (
          <Link href="/admin/events/new" className="block">
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-6 hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">➕ Create New Event</h2>
              <p className="text-gray-600 dark:text-gray-400">Add a new event, set capacity, and generate tickets.</p>
            </div>
          </Link>
        )}

        {/* Manage Tickets Card - for all admins */}
        <Link href="/admin/events" className="block">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">🎟️ Manage Tickets</h2>
            <p className="text-gray-600 dark:text-gray-400">View all events and their tickets. Verify payments, cancel or regenerate tickets.</p>
          </div>
        </Link>

        {/* 🆕 Manage Users Card - for all admins */}
        <Link href="/admin/users" className="block">
          <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold mb-2">👥 Manage Users</h2>
            <p className="text-gray-600 dark:text-gray-400">View all registered users and their ticket history.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}