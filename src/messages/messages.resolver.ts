import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { GetMessagesInput, SendMessageInput } from './input/messages.input';
import { GetMessagesOutput, SendMessageOutput } from './dto/messages.dto';

@Resolver()
export class MessagesResolver {
  constructor(private messagesService: MessagesService) {}

  @Query(() => GetMessagesOutput)
  async getMessages(@Args('data') data: GetMessagesInput) {
    const messages = await this.messagesService.getMessages(data);
    return messages;
  }

  @Mutation(() => SendMessageOutput)
  async sendMessage(@Args('data') data: SendMessageInput) {
    try {
      const sentMessage = await this.messagesService.sendMessage(data);
      return { status: Boolean(sentMessage) };
    } catch (err) {}
  }
}
