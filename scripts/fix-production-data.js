const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fixProductionData() {
  try {
    console.log('🔍 Starting safe data fix...')
    console.log('📊 This will only update events with null updatedAt')
    
    // Find events with null updatedAt
    const events = await prisma.event.findMany({
      where: {
        updatedAt: null
      }
    })
    
    console.log(`📊 Found ${events.length} events with null updatedAt`)
    
    if (events.length === 0) {
      console.log('✅ No events need fixing!')
      return
    }
    
    let fixedCount = 0
    for (const event of events) {
      console.log(`   Fixing: ${event.title || event.id}`)
      await prisma.event.update({
        where: { id: event.id },
        data: { 
          updatedAt: event.createdAt || new Date() 
        }
      })
      fixedCount++
    }
    
    console.log(`✅ Successfully fixed ${fixedCount} events`)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

fixProductionData()