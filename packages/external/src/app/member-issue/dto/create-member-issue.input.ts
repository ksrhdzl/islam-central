import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsObject, IsOptional } from 'class-validator';
import { MemberIssueRoleEnum } from 'general';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateMemberIssueInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  memberId?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  issueId?: number;

  @IsOptional()
  @IsEnum(MemberIssueRoleEnum)
  @Field(() => MemberIssueRoleEnum, { nullable: true })
  role?: MemberIssueRoleEnum;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
