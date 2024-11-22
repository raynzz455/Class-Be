import { PrismaClient } from '@prisma/client';
import { seedRoles } from './seeders/roles.seed';

const prisma = new PrismaClient();

async function main() {
  await seedRoles(prisma); 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
