import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  await prisma.role.createMany({
    data: [
      { name: 'student', slug: 'student' },
      { name: 'teacher', slug: 'teacher' },
    ],
  });

  console.log('Roles seeded successfully');
}
