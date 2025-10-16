import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsObject, IsOptional } from 'class-validator';
import { MemberConversationRoleEnum } from 'general';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class CreateMemberConversationInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  memberId?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  conversationId?: number;

  @IsOptional()
  @IsEnum(MemberConversationRoleEnum)
  @Field(() => MemberConversationRoleEnum, { nullable: true })
  role?: MemberConversationRoleEnum;

  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  metadata?: Record<string, unknown>;
}
