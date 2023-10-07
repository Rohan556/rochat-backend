import { Query } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import { SearchUserInput } from './input/users.input';
import { Users } from './dto/users.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query(() => [Users])
  async getSearchedUsers(@Args('data') data: SearchUserInput) {
    try {
      const searchedUsers: Users[] = await this.usersService.getSearchedUsers(
        data.searchString,
      );

      return searchedUsers;
    } catch (err) {}
  }
}
