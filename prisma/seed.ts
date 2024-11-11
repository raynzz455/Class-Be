import { PrismaClient } from '@prisma/client';
import { seedAdmins } from './seeders/admin.seed';

const prisma = new PrismaClient();

async function main() {
  await seedAdmins(prisma); // Tambahkan proses seeding untuk Admin
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
