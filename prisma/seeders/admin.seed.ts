import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedAdmins(prisma: PrismaClient) {
  const password = await bcrypt.hash("password", 10);

  const admins = [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: password,
      slug: "dashboard" 
    },
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: { password: admin.password, name: admin.name, slug: admin.slug },
      create: admin,
    });
  }

  console.log('Admins seeded successfully');
}
