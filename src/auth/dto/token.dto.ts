import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTToken {
  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  accessToken: string;
}

@ObjectType()
export class LoginOutput {
  @Field(() => Int)
  userId: number;

  @Field()
  token: JWTToken;
}
