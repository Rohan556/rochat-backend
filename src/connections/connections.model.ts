import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { Users } from 'src/users/dto/users.dto';

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

  async getUsersConnection(connection_id: number) {
    try {
      const connectedUsers = await this.prismaService.connections.findUnique({
        where: {
          connection_id,
        },
      });
      return connectedUsers;
    } catch (e) {}
  }

  async getUserConnections(userId: number) {
    try {
      const connectedUsers = await this.prismaService.connections.findMany({
        where: {
          OR: [
            {
              user1_id: userId,
            },
            {
              user2_id: userId,
            },
          ],
        },
      });

      const users = this.extractUniqueUsers(connectedUsers, userId);

      const usersInfo = await this.getUsersInfo(users);

      return usersInfo;
    } catch (err) {}
  }

  extractUniqueUsers(
    connectedUsers: {
      connection_id: number;
      user1_id: number;
      user2_id: number;
    }[],
    userId: number,
  ) {
    const uniqueUsers = connectedUsers.map((connectedUser) => {
      const usersId =
        connectedUser.user1_id === userId
          ? connectedUser.user2_id
          : connectedUser.user1_id;

      return usersId;
    });

    return [...new Set(uniqueUsers)];
  }

  async getUsersInfo(users: number[]) {
    const prepareData = users.map((user_id) => {
      return {
        id: user_id,
      };
    });

    const usersInfo = await this.prismaService.users.findMany({
      where: {
        OR: prepareData,
      },
    });

    return usersInfo;
  }
}
