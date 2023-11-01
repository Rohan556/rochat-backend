import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateConnectionInput } from 'src/connections/input/connections.input';

@InputType()
export class SendMessageInput extends CreateConnectionInput {
  @Field(() => Int)
  @IsNotEmpty()
  sender_id: number;

  @Field(() => String)
  @IsNotEmpty()
  message: string;
}

@InputType()
export class GetMessagesInput {
  @Field(() => Int)
  @IsNotEmpty()
  user1_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  user2_id: number;
}
