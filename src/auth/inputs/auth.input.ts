import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class signupInput {
  @Field(() => String)
  @IsNotEmpty()
  username: String;

  @Field(() => String)
  @IsNotEmpty()
  name: String;

  @Field(() => String)
  @IsNotEmpty()
  password: String;

  @Field(() => String)
  @IsNotEmpty()
  confirmPassword: String;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
