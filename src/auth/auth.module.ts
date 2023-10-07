import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthModel } from './auth.model';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [AuthResolver, AuthService, AuthModel, PrismaService],
})
export class AuthModule {}
