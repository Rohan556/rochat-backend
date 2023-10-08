import { Injectable } from '@nestjs/common';
import { CreateConnectionInput } from './input/connections.input';
import { ConnectionsModel } from './connections.model';

@Injectable()
export class ConnectionsService {
  constructor(private connectionModel: ConnectionsModel) {}

  async createConnection(data: CreateConnectionInput) {
    const connection = this.connectionModel.createUserConnection(
      data.user1_id,
      data.user2_id,
    );
    return connection;
  }
}
