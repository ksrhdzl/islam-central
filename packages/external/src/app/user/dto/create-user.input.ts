import { Field, InputType } from '@nestjs/graphql';
import {
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateUserInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @Field(() => String)
  password: string;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
