import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateMessageInput {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: false })
  content: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: false })
  type: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  workspaceId?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  memberId?: number;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
