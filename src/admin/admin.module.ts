import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module'; // Impor AuthModule

@Module({
  imports: [AuthModule], // Pastikan AuthModule diimpor
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule {}
