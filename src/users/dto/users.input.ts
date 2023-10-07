import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;
}
