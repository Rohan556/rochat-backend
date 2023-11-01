import { Injectable } from '@nestjs/common';
import { MessagesModel } from './messages.model';
import { SendMessageInput } from './input/messages.input';
import { ConnectionsModel } from 'src/connections/connections.model';
import { UsersModel } from 'src/users/users.model';

@Injectable()
export class MessagesService {
  constructor(
    private messagesModel: MessagesModel,
    private connectionsModel: ConnectionsModel,
    private usersModel: UsersModel,
  ) {}

  async sendMessage(connection_id, data: SendMessageInput) {
    try {
      const sentMessage = await this.messagesModel.sendMessage(
        connection_id,
        data.message,
        data.sender_id,
      );
      return sentMessage;
    } catch (err) {}
  }

  async getMessages(connection_id: number) {
    const getConnectedUsers =
      await this.connectionsModel.getUsersConnection(connection_id);

    const user1Details = await this.usersModel.getUserFromUserId(
      getConnectedUsers.user1_id,
    );

    delete user1Details.password;
    const user2Details = await this.usersModel.getUserFromUserId(
      getConnectedUsers.user2_id,
    );

    delete user2Details.password;

    const messages = await this.messagesModel.getAllMessages(connection_id);
    return {
      user1Details,
      user2Details,
      messages,
    };
  }

  getChannelName(user1_id: number, user2_id: number) {
    if (user1_id < user2_id)
      return user1_id.toString() + '.' + user2_id.toString();

    return user2_id.toString() + '.' + user1_id.toString();
  }
}
