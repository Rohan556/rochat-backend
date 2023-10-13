import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/dto/users.dto';

@ObjectType()
export class SendMessageOutput {
  @Field(() => Boolean)
  status: boolean;
}

@ObjectType()
export class MessageContentOutput {
  @Field(() => String, { nullable: true })
  getRealtimeMessage: string;
}

@ObjectType()
export class GetMessageFormat {
  @Field(() => Int)
  sender_id: number;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  sent_time: Date;
}

@ObjectType()
export class GetMessagesOutput {
  @Field(() => Users)
  user1Details: Users;

  @Field(() => Users)
  user2Details: Users;

  @Field(() => [GetMessageFormat])
  messages: GetMessageFormat[];
}
