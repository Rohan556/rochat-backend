import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTToken {
  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  accessToken: string;
}
