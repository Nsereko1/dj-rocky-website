const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Update all events - set updatedAt to now if missing or null
  const result = await prisma.event.updateMany({
    data: {
      updatedAt: new Date()
    }
  });

  console.log(`✅ Updated ${result.count} events`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());