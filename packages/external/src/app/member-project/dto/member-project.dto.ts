import { Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
} from '@ptc-org/nestjs-query-graphql';
import { MemberProjectRoleEnum } from 'general';
import { MemberDTO } from '@/app/member/dto/member.dto';
import { ProjectDTO } from '@/app/project/dto/project.dto';
import { Base } from '@/dto';

@ObjectType('MemberProject')
@FilterableRelation('member', () => MemberDTO, {
  nullable: true,
})
@FilterableRelation('project', () => ProjectDTO, {
  nullable: true,
})
export class MemberProjectDTO extends Base {
  @FilterableField(() => Int, { nullable: true })
  memberId?: number;

  @FilterableField(() => Int, { nullable: true })
  projectId?: number;

  @FilterableField(() => MemberProjectRoleEnum, { nullable: true })
  role?: MemberProjectRoleEnum;
}
