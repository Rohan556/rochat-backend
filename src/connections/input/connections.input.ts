import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateConnectionInput {
  @Field(() => Int)
  @IsNotEmpty()
  user1_id: number;

  @Field(() => Int)
  @IsNotEmpty()
  user2_id: number;
}
