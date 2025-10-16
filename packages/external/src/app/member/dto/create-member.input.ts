import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsObject, IsOptional } from 'class-validator';
import { MemberRoleEnum } from 'general';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateMemberInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  userId?: number;

  @IsOptional()
  @IsEnum(MemberRoleEnum)
  @Field(() => MemberRoleEnum, { nullable: true })
  role?: MemberRoleEnum;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  workspaceId?: number;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
