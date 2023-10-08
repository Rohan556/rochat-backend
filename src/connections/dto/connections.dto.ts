import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateConnectionOutput {
  @Field(() => Boolean)
  status: boolean;
}
