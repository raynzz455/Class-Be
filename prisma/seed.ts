import { PrismaClient } from '@prisma/client';
import { seedAdmins } from './seeders/admin.seed';
import { seedUsers } from './seeders/users.seed'

const prisma = new PrismaClient();

async function main() {
  await seedAdmins(prisma); 
  await seedUsers (prisma)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
