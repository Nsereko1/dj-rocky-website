const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()

async function fixAllEvents() {
  try {
    console.log('🔍 Finding all events...')
    
    const events = await p.event.findMany({
      select: { id: true, title: true, updatedAt: true }
    })
    
    console.log(`📊 Found ${events.length} events`)
    
    // Find events with null updatedAt
    const nullEvents = events.filter(e => !e.updatedAt)
    
    if (nullEvents.length === 0) {
      console.log('✅ No events with null updatedAt found!')
      return
    }
    
    console.log(`\n🔧 Found ${nullEvents.length} events with null updatedAt. Fixing...`)
    
    for (const e of nullEvents) {
      await p.event.update({
        where: { id: e.id },
        data: { updatedAt: new Date() }
      })
      console.log(`  ✅ Fixed: ${e.title}`)
    }
    
    console.log('\n✅ All events fixed!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await p.$disconnect()
  }
}

fixAllEvents()