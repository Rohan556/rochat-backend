import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ConnectionsModel {
  constructor(private prismaService: PrismaService) {}

  async createUserConnection(user1: number, user2: number) {
    try {
      const connection = await this.prismaService.connections.create({
        data: {
          user1_id: user1,
          user2_id: user2,
        },
      });
      return connection;
    } catch (err) {}
  }
}
