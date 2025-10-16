import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  Relation,
  UnPagedRelation,
} from '@ptc-org/nestjs-query-graphql';
import { MessageDTO } from '@/app/message/dto/message.dto';
import { WorkspaceDTO } from '@/app/workspace/dto/workspace.dto';
import { Base } from '@/dto';

@ObjectType('Conversation')
@Relation('workspace', () => WorkspaceDTO, {
  nullable: true,
})
@UnPagedRelation('messages', () => MessageDTO, {
  nullable: true,
  update: { enabled: true },
  remove: { enabled: true },
})
export class ConversationDTO extends Base {
  @FilterableField(() => String, { nullable: true })
  name?: string;

  @FilterableField(() => String, { nullable: false })
  type?: string;

  @FilterableField(() => String, { nullable: true })
  slug!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @FilterableField(() => Int, { nullable: true })
  workspaceId?: number;
}
