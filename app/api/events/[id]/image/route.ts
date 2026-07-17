import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import fs from 'fs/promises'
import path from 'path'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Delete the image file if it exists
    if (event.image) {
      const filePath = path.join(process.cwd(), 'public', event.image)
      try {
        await fs.unlink(filePath)
      } catch (error) {
        console.error('Failed to delete file:', error)
        // Continue even if file deletion fails
      }
    }

    // Update event to remove image reference
    await prisma.event.update({
      where: { id },
      data: { image: null }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing image:', error)
    return NextResponse.json({ error: 'Failed to remove image' }, { status: 500 })
  }
}
