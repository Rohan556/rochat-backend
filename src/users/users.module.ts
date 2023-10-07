import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [UsersService, UsersResolver, UsersModel, PrismaService],
})
export class UsersModule {}
