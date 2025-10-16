import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateConversationInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: false })
  type: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  slug: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  workspaceId?: number;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
