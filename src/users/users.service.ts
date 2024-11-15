import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password, roleId } = createUserDto;

    // Buat pengguna baru
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    // Tambahkan peran ke pengguna
    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId,
      },
    });

    return user;
  }
}
