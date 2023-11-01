import { Module } from '@nestjs/common';
import { ConnectionsResolver } from './connections.resolver';
import { ConnectionsService } from './connections.service';
import { ConnectionsModel } from './connections.model';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [
    ConnectionsResolver,
    ConnectionsService,
    ConnectionsModel,
    PrismaService,
  ],
})
export class ConnectionsModule {}
