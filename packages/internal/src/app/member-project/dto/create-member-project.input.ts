import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsObject, IsOptional } from 'class-validator';
import { MemberProjectRoleEnum } from 'general';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateMemberProjectInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  memberId?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  projectId?: number;

  @IsOptional()
  @IsEnum(MemberProjectRoleEnum)
  @Field(() => MemberProjectRoleEnum, { nullable: true })
  role?: MemberProjectRoleEnum;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
