import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (admin && await bcrypt.compare(password, admin.password)) {
      return admin;
    }
    return null;
  }

  async signIn(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);
    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: admin.name, sub: admin.id, role: 'admin', slug: admin.slug };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
