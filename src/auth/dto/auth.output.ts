import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/users/dto/users.input';

@ObjectType()
export class Auth {
  @Field(() => Users)
  users: Users;
}
