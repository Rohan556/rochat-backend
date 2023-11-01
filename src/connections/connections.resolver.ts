import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateConnectionOutput } from './dto/connections.dto';
import { CreateConnectionInput } from './input/connections.input';
import { ConnectionsService } from './connections.service';
import { Users } from 'src/users/dto/users.dto';
import { GetConnectionInput } from 'src/users/input/users.input';

@Resolver()
export class ConnectionsResolver {
  constructor(private connectionsService: ConnectionsService) {}
  @Mutation(() => CreateConnectionOutput)
  async createUserConnection(@Args('data') data: CreateConnectionInput) {
    try {
      const connection = await this.connectionsService.createConnection(data);
      if (!connection) return { status: false };

      return { status: true };
    } catch (err) {}
  }

  @Query(() => [Users])
  async getConnections(@Args('data') data: GetConnectionInput) {
    try {
      const connectedUsers = await this.connectionsService.getConnections(data);
      return connectedUsers;
    } catch (err) {}
  }
}
