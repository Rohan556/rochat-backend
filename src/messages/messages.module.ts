import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { MessagesModel } from './messages.model';
import { PrismaService } from 'src/services/prisma.service';
import { ConnectionsModel } from 'src/connections/connections.model';
import { UsersModel } from 'src/users/users.model';

@Module({
  providers: [
    MessagesResolver,
    MessagesService,
    MessagesModel,
    PrismaService,
    ConnectionsModel,
    UsersModel,
  ],
})
export class MessagesModule {}
