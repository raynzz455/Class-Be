import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password, roleId } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId,
      },
    });

    return user;
  }

  async deleteUser(id: string) {
    await this.prisma.userRole.deleteMany({
      where: { userId: id },
    });
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { name, email, password } = updateUserDto;
    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    });
  }

  async addRoleToUser(userId: string, addRoleDto: AddRoleDto) {
    const { roleId } = addRoleDto;
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }
}
