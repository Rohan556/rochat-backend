import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;
}
