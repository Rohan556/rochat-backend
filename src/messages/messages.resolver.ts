import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { GetMessagesInput, SendMessageInput } from './input/messages.input';
import {
  GetMessagesOutput,
  MessageContentOutput,
  SendMessageOutput,
} from './dto/messages.dto';
import { PubSub } from 'graphql-subscriptions';
import { ConnectionsService } from 'src/connections/connections.service';
import { GetConnectionInput } from 'src/users/input/users.input';
import { CreateConnectionInput } from 'src/connections/input/connections.input';
@Resolver()
export class MessagesResolver {
  private pubSub: PubSub;
  constructor(
    private messagesService: MessagesService,
    private connectionService: ConnectionsService,
  ) {
    this.pubSub = new PubSub();
  }

  @Query(() => GetMessagesOutput)
  async getMessages(@Args('data') data: GetMessagesInput) {
    const connectionId = await this.connectionService.getConnectionId(data);

    const messages = await this.messagesService.getMessages(connectionId);
    return messages;
  }

  @Mutation(() => SendMessageOutput)
  async sendMessage(@Args('data') data: SendMessageInput) {
    try {
      const { user1_id, user2_id } = data;
      const connection_id = await this.connectionService.getConnectionId({
        user1_id,
        user2_id,
      });
      const listeningChannel = this.messagesService.getChannelName(
        user1_id,
        user2_id,
      );
      const message = {
        getRealtimeMessage: data.message,
        sender_id: data.sender_id,
      };
      const sentMessage = await this.messagesService.sendMessage(
        connection_id,
        data,
      );

      await this.pubSub.publish(listeningChannel, message);
      return { status: Boolean(sentMessage) };
    } catch (err) {
      console.error('Error in sendMessage:', err);
    }
  }

  @Subscription((returns) => MessageContentOutput, {
    resolve: (value) => value,
  })
  getRealtimeMessage(@Args('data') data: CreateConnectionInput) {
    console.log('Subscription is being called');
    const listeningChannel = this.messagesService.getChannelName(
      data.user1_id,
      data.user2_id,
    );
    return this.pubSub.asyncIterator(listeningChannel);
  }
}
