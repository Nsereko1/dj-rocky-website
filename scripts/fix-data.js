const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fixProductionData() {
  try {
    console.log('🚀 Starting safe data fix...')
    console.log('📊 This will only update events with null updatedAt')
    
    // First, test the connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Count total events
    const totalEvents = await prisma.event.count()
    console.log(`📊 Total events in database: ${totalEvents}`)
    
    if (totalEvents === 0) {
      console.log('ℹ️ No events found. Nothing to fix.')
      return
    }
    
    // Find events with null updatedAt
    const events = await prisma.event.findMany({
      where: {
        updatedAt: null
      }
    })
    
    console.log(`📊 Found ${events.length} events with null updatedAt`)
    
    if (events.length === 0) {
      console.log('✅ No events need fixing! Everything is good.')
      return
    }
    
    // Show what will be fixed
    console.log('\n📋 Events to fix:')
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title || 'Untitled'} (created: ${event.createdAt})`)
    })
    
    // Fix each event
    let fixedCount = 0
    for (const event of events) {
      try {
        console.log(`   🔧 Fixing: ${event.title || event.id}`)
        await prisma.event.update({
          where: { id: event.id },
          data: { 
            updatedAt: event.createdAt || new Date() 
          }
        })
        fixedCount++
        console.log(`   ✅ Fixed: ${event.title || event.id}`)
      } catch (updateError) {
        console.error(`   ❌ Failed to fix ${event.id}:`, updateError.message)
      }
    }
    
    console.log(`\n✅ Successfully fixed ${fixedCount} out of ${events.length} events`)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.stack) {
      console.error('Stack trace:', error.stack)
    }
  } finally {
    await prisma.$disconnect()
    console.log('👋 Disconnected from database')
  }
}

// Run the function
fixProductionData()