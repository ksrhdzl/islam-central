import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AuthInput {
  @IsString()
  @Field(() => String, { nullable: false })
  identifier: string;

  @IsString()
  @Field(() => String, { nullable: false })
  password: string;
}
