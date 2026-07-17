const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$runCommandRaw({
      updateMany: "Event",
      filter: {
        $or: [
          { updatedAt: null },
          { updatedAt: { $exists: false } }
        ]
      },
      update: {
        $set: { updatedAt: new Date() }
      }
    });

    console.log("✅ Fix applied!", result);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();