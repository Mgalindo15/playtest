import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    //CREATE: Add a new banker
    const newBanker = await prisma.banker.create({
        data: {
            id: 1,
            status: "busy",
            name: "Marcel"
        },
    })

    console.log('Created Banker:', newBanker);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())