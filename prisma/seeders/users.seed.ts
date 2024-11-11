import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient) {
  const password = await bcrypt.hash("password", 10);

  const users = [
    {
      name: "Reza",
      email: "reza@example.com",
      password: password,
    },
    {
      name: "Aldi",
      email: "aldi@example.com",
      password: password,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { password: user.password, name: user.name },
      create: user,
    });
  }

  console.log('Users seeded successfully');
}
