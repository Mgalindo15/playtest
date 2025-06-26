import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- Seed Clients ---
  const clients = await prisma.client.createMany({
    data: [
      { email: "alice@redsettle.com", name: "Alice", bio: "Language lover", status: "ACTIVE" },
      { email: "bob@redsettle.com", name: "Bob", bio: "Just browsing", status: "INACTIVE" },
      { email: "charlie@redsettle.com", name: "Charlie", bio: "Grammar is life", status: "BANNED" },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ Inserted ${clients.count} clients.`);

  // --- Seed Bankers ---
  const banker1 = await prisma.banker.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "Marcel", terminal: 101, payGrade: 3 },
  });

  const banker2 = await prisma.banker.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: "Rina", terminal: 102, payGrade: 5 },
  });

  console.log(`✅ Created bankers: ${banker1.name}, ${banker2.name}`);

  // --- Seed Products ---
  const products = await prisma.product.createMany({
    data: [
      { sku: "PROD-001", name: "Redsettle Shirt", price: 29.99, description: "Redsettle branded wear" },
      { sku: "PROD-002", name: "Learning Notebook", price: 9.5 },
      { sku: "PROD-003", name: "HSK Practice Cards", price: 14.0, description: "Flashcards for HSK prep" },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Inserted ${products.count} products.`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
  })
  .finally(() => prisma.$disconnect());
