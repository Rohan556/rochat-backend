import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class MessagesModel {
  constructor(private prismaService: PrismaService) {}

  async sendMessage(connection_id: number, message: string, sender_id: number) {
    try {
      const messageSent = await this.prismaService.messages.create({
        data: {
          connection_id: connection_id,
          sender_id: sender_id,
          content: message,
        },
      });
      return messageSent;
    } catch (err) {}
  }

  async getAllMessages(connection_id: number) {
    try {
      const messages = await this.prismaService.messages.findMany({
        where: {
          connection_id,
        },
        select: {
          content: true,
          sender_id: true,
          sent_time: true,
        },
      });
      return messages;
    } catch (e) {}
  }
}
