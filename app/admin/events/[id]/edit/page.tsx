import { prisma } from '@/app/lib/prisma'
import { getSession, isSuperAdmin } from '@/app/lib/auth'
import { redirect } from 'next/navigation'
import EditEventForm from './EditEventForm'

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  if (!session || !session.user) redirect('/api/auth/signin')
  const email = session.user.email
  if (!email) redirect('/api/auth/signin')
  if (!isSuperAdmin(email)) redirect('/admin')

  const event = await prisma.event.findUnique({ where: { id } })
  if (!event) redirect('/admin/events')

  return (
    <div className="container mx-auto p-4 pt-20 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <EditEventForm event={event} />
    </div>
  )
}