import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';
import { MessagesModel } from './messages.model';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  providers: [MessagesResolver, MessagesService, MessagesModel, PrismaService],
})
export class MessagesModule {}
