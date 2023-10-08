import { Injectable } from '@nestjs/common';
import { Users } from './dto/users.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UsersModel {
  constructor(private prismaService: PrismaService) {}
  async getSearchedUsers(searchString: string): Promise<Users[]> {
    try {
      const users: Users[] = await this.prismaService.users.findMany({
        where: {
          OR: [
            {
              username: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: searchString,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: {
          id: true,
          username: true,
          name: true,
          status: true,
        },
      });
      return (users as Users[]) || [];
    } catch (err) {}
  }

  async getUserFromUserId(userId: number) {
    try {
      const userDetails = await this.prismaService.users.findUnique({
        where: {
          id: userId,
        },
      });
      return userDetails;
    } catch (e) {}
  }
}
