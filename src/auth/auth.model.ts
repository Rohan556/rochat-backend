import { PrismaService } from 'src/services/prisma.service';
import { signupInput } from './inputs/auth.input';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthModel {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: signupInput) {
    try {
      const user = await this.prismaService.users.create({
        data: {
          username: data.username.toString(),
          password: data.password.toString(),
          name: data.name.toString(),
        },
      });
      delete user.password;
      return user;
    } catch (err) {
      console.log({ err });
    }
  }

  async getUserPassword(
    username: string,
  ): Promise<{ password: string; userId: number }> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          username: username,
        },
      });

      return {
        password: user.password,
        userId: user.id,
      };
    } catch (err) {
      console.log({ err });
    }
  }
}
