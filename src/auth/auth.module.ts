import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './jwt/local.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './auth.constants';
import { AdminService } from '../admin/admin.service';
import { AdminController } from '../admin/admin.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, PrismaService, AdminService],
  controllers: [AuthController, AdminController],
  exports: [AuthService, JwtModule], // Pastikan JwtModule diekspor
})
export class AuthModule {}
