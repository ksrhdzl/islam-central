import { Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
} from '@ptc-org/nestjs-query-graphql';
import { MemberConversationRoleEnum } from 'general';
import { ConversationDTO } from '@/app/conversation/dto/conversation.dto';
import { MemberDTO } from '@/app/member/dto/member.dto';
import { Base } from '@/dto';

@ObjectType('MemberConversation')
@FilterableRelation('member', () => MemberDTO, {
  nullable: true,
})
@FilterableRelation('conversation', () => ConversationDTO, {
  nullable: true,
})
export class MemberConversationDTO extends Base {
  @FilterableField(() => Int, { nullable: true })
  memberId?: number;

  @FilterableField(() => Int, { nullable: true })
  conversationId?: number;

  @FilterableField(() => MemberConversationRoleEnum, { nullable: true })
  role?: MemberConversationRoleEnum;
}
