import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SearchUserInput {
  @Field(() => String)
  @IsNotEmpty()
  searchString: string;
}

@InputType()
export class GetConnectionInput {
  @Field(() => Int)
  @IsNotEmpty()
  userId: number;
}
