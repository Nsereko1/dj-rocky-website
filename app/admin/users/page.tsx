import { prisma } from '@/app/lib/prisma'
import { getSession, isAnyAdmin } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const session = await getSession()
  if (!session || !session.user) redirect('/api/auth/signin')
  const email = session.user.email
  if (!email || !isAnyAdmin(email)) redirect('/admin')

  const users = await prisma.user.findMany({
    include: {
      tickets: {
        select: {
          ticketNo: true,
          status: true,
          event: { select: { title: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5, // Show latest 5 tickets per user
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto p-4 pt-20 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Users</h1>
        <Link href="/admin" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Total Tickets</th>
              <th className="border p-2">Last Purchase</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name || '—'}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone || '—'}</td>
                <td className="border p-2 text-center">{user.totalTickets}</td>
                <td className="border p-2">
                  {user.lastPurchaseAt
                    ? new Date(user.lastPurchaseAt).toLocaleDateString()
                    : '—'}
                </td>
                <td className="border p-2">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}