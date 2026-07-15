import { prisma } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket?: string; event?: string }>
}) {
  const { ticket: ticketNo, event: eventId } = await searchParams

  if (!ticketNo || !eventId) redirect('/events')

  const ticket = await prisma.ticket.findUnique({
    where: { ticketNo },
    include: { event: true },
  })

  if (!ticket || ticket.eventId !== eventId) redirect('/events')

  return (
    <div className="container mx-auto p-4 pt-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">Purchase Successful!</h1>
      <p className="text-xl mt-4">Your ticket number is:</p>
      <p className="text-4xl font-mono font-bold bg-gray-100 p-4 inline-block mt-2">
        {ticketNo}
      </p>
      <p className="mt-4">Event: {ticket.event.title}</p>
      <p>Please keep this number safe – you'll need it for entry.</p>
    </div>
  )
}