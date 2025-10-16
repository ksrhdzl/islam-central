import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthOutput {
  @Field(() => String, { nullable: true })
  token: string;
}
