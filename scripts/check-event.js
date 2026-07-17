const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkEvent() {
  try {
    console.log('🔍 Checking events...')
    
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    console.log(`📊 Found ${events.length} event(s)`)
    
    events.forEach((event, index) => {
      console.log(`\n📌 Event ${index + 1}:`)
      console.log(`   ID: ${event.id}`)
      console.log(`   Title: ${event.title}`)
      console.log(`   Created: ${event.createdAt}`)
      console.log(`   Updated: ${event.updatedAt || '🔴 NULL (needs fixing)'}`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkEvent()