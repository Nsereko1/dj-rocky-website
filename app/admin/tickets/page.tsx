import { prisma } from '@/app/lib/prisma'
import { getSession, isAnyAdmin, isSuperAdmin } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CancelButton from '@/app/components/CancelButton'
import DeleteButton from '@/app/components/DeleteButton'
import { Status } from '@prisma/client'

export default async function AdminTicketsPage() {
  const session = await getSession()
  if (!session || !session.user) redirect('/api/auth/signin')
  const email = session.user.email
  if (!email) redirect('/api/auth/signin')
  if (!isAnyAdmin(email)) redirect('/')

  const isSuper = isSuperAdmin(email)

  const tickets = await prisma.ticket.findMany({
    where: {
      status: { in: [Status.RESERVED, Status.SOLD] },
    },
    include: { event: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ticket Reservations</h1>
        <Link
          href="/admin/events/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create New Event
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2">Ticket No</th>
                <th className="border p-2">Buyer</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Event</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="border p-2 font-mono">{ticket.ticketNo}</td>
                  <td className="border p-2">{ticket.purchaserName || '—'}</td>
                  <td className="border p-2">{ticket.purchaserPhone || '—'}</td>
                  <td className="border p-2">{ticket.event.title}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.status === Status.RESERVED
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    <div className="flex flex-wrap gap-2">
                      {/* Verify: only for RESERVED tickets */}
                      {ticket.status === Status.RESERVED && (
                        <form action="/api/tickets/mark-paid" method="POST">
                          <input type="hidden" name="ticketId" value={ticket.id} />
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition whitespace-nowrap">
                            ✅ Verify
                          </button>
                        </form>
                      )}

                      {/* Cancel: only for RESERVED tickets */}
                      {ticket.status === Status.RESERVED && (
                        <CancelButton ticketId={ticket.id} />
                      )}

                      {/* Delete: super admin only, any status */}
                      {isSuper && (
                        <DeleteButton ticketId={ticket.id} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}