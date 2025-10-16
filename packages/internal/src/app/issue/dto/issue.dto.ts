import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { IssueStatusEnum } from 'general';
import { ProjectDTO } from '@/app/project/dto/project.dto';
import { WorkspaceDTO } from '@/app/workspace/dto/workspace.dto';
import { Base } from '@/dto';

@ObjectType('Issue')
@Relation('workspace', () => WorkspaceDTO, {
  nullable: true,
})
@Relation('project', () => ProjectDTO, {
  nullable: true,
})
export class IssueDTO extends Base {
  @FilterableField(() => String, { nullable: true })
  name?: string;

  @FilterableField(() => String, { nullable: false })
  slug!: string;

  @FilterableField(() => IssueStatusEnum, { nullable: true })
  status?: IssueStatusEnum;

  @Field(() => String, { nullable: true })
  description?: string;

  @FilterableField(() => Int, { nullable: true })
  workspaceId?: number;

  @FilterableField(() => Int, { nullable: true })
  projectId?: number;

  @FilterableField(() => Int, { nullable: true })
  position?: number;

  @FilterableField(() => Date, { nullable: true })
  startAt?: Date;

  @FilterableField(() => Date, { nullable: true })
  endAt?: Date;
}
