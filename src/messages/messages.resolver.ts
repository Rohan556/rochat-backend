import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { GetMessagesInput, SendMessageInput } from './input/messages.input';
import {
  GetMessagesOutput,
  MessageContentOutput,
  SendMessageOutput,
} from './dto/messages.dto';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class MessagesResolver {
  private pubSub: PubSub;
  constructor(private messagesService: MessagesService) {
    this.pubSub = new PubSub();
  }

  @Query(() => GetMessagesOutput)
  async getMessages(@Args('data') data: GetMessagesInput) {
    const messages = await this.messagesService.getMessages(data);
    return messages;
  }

  @Mutation(() => SendMessageOutput)
  async sendMessage(@Args('data') data: SendMessageInput) {
    try {
      const message = { getRealtimeMessage: data.message };
      console.log({ message });
      const sentMessage = await this.messagesService.sendMessage(data);
      await this.pubSub.publish('getRealtimeMessage', message);
      return { status: Boolean(sentMessage) };
    } catch (err) {}
  }

  @Subscription((returns) => MessageContentOutput, {
    name: 'getRealtimeMessage',
  })
  getRealtimeMessage() {
    console.log('here');
    return this.pubSub.asyncIterator('getRealtimeMessage');
  }
}
