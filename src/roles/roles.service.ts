import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getAllRoles() {
    return this.prisma.role.findMany();
  }

  async createRole(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async deleteRole(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }
}
