import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SendMessageInput {
  @Field(() => Int)
  @IsNotEmpty()
  connection_id: number;

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
  connection_id: number;
}
