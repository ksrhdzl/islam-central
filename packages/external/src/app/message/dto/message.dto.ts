import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableUnPagedRelation,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ConversationDTO } from '@/app/conversation/dto/conversation.dto';
import { MemberDTO } from '@/app/member/dto/member.dto';
import { WorkspaceDTO } from '@/app/workspace/dto/workspace.dto';
import { Base } from '@/dto';

@ObjectType('Message')
@FilterableUnPagedRelation('conversations', () => ConversationDTO, {
  nullable: true,
})
@Relation('workspace', () => WorkspaceDTO, {
  nullable: true,
})
@Relation('member', () => MemberDTO, {
  nullable: true,
})
export class MessageDTO extends Base {
  @Field(() => String, { nullable: false })
  content?: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @FilterableField(() => Int, { nullable: true })
  workspaceId?: number;

  @FilterableField(() => Int, { nullable: true })
  memberId?: number;
}
