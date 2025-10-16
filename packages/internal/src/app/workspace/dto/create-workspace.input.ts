import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateWorkspaceInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: false })
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: false })
  slug: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  image: string;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
