import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateConnectionOutput } from './dto/connections.dto';
import { CreateConnectionInput } from './input/connections.input';
import { ConnectionsService } from './connections.service';

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
}
