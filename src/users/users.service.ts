import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    const usersWithRoles = await Promise.all(users.map(async user => {
      const userRoles = await this.prisma.userRole.findMany({
        where: { userId: user.id },
        include: { role: true }  
      });

      return {
        ...user,
        roles: userRoles.map(userRole => userRole.role)  
      };
    }));

    return usersWithRoles;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password, roleId } = createUserDto;

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await this.prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: roleId,
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
