import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  OffsetConnection,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { IssueDTO } from '@/app/issue/dto/issue.dto';
import { WorkspaceDTO } from '@/app/workspace/dto/workspace.dto';
import { Base } from '@/dto';

@ObjectType('Project')
@Relation('workspace', () => WorkspaceDTO, {
  nullable: true,
})
@OffsetConnection('issues', () => IssueDTO, {
  nullable: true,
})
export class ProjectDTO extends Base {
  @FilterableField(() => String, { nullable: true })
  name?: string;

  @FilterableField(() => String, { nullable: false })
  slug!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @FilterableField(() => Int, { nullable: true })
  workspaceId?: number;
}
