console.log('Script is running!')
console.log('Current directory:', process.cwd())

const { PrismaClient } = require('@prisma/client')
console.log('Prisma imported successfully')

const prisma = new PrismaClient()
console.log('Prisma client created')

async function test() {
  console.log('Testing connection...')
  try {
    await prisma.$connect()
    console.log('✅ Connected to database!')
    
    const count = await prisma.event.count()
    console.log(`📊 Total events: ${count}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()