const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fixEvent() {
  try {
    console.log('🔍 Finding event with null updatedAt...')
    
    // Find events with null updatedAt
    const events = await prisma.event.findMany({
      where: {
        updatedAt: null
      }
    })
    
    console.log(`�� Found ${events.length} event(s) with null updatedAt`)
    
    if (events.length === 0) {
      console.log('✅ No events need fixing!')
      return
    }
    
    for (const event of events) {
      console.log(`\n🔧 Fixing event: ${event.title || event.id}`)
      console.log(`   ID: ${event.id}`)
      console.log(`   Created at: ${event.createdAt}`)
      console.log(`   Current updatedAt: ${event.updatedAt}`)
      
      const updated = await prisma.event.update({
        where: { id: event.id },
        data: { 
          updatedAt: event.createdAt || new Date() 
        }
      })
      
      console.log(`✅ Fixed! New updatedAt: ${updated.updatedAt}`)
    }
    
    console.log('\n✅ All events fixed!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

fixEvent()
