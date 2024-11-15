import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const { name, slug } = createRoleDto;
    return this.prisma.role.create({
      data: {
        name,
        slug,
      },
    });
  }

  async deleteRole(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    const { name, slug } = updateRoleDto;
    return this.prisma.role.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });
  }
}
