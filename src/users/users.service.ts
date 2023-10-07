import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {
  constructor(private usersModel: UsersModel) {}

  async getSearchedUsers(searchString: string): Promise<Users[]> {
    try {
      const searchedUsers =
        await this.usersModel.getSearchedUsers(searchString);

      return (searchedUsers as Users[]) || [];
    } catch (err) {}
  }
}
