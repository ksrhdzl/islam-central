import { Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
} from '@ptc-org/nestjs-query-graphql';
import { MemberIssueRoleEnum } from 'general';
import { IssueDTO } from '@/app/issue/dto/issue.dto';
import { MemberDTO } from '@/app/member/dto/member.dto';
import { Base } from '@/dto';

@ObjectType('MemberIssue')
@FilterableRelation('member', () => MemberDTO, {
  nullable: true,
})
@FilterableRelation('issue', () => IssueDTO, {
  nullable: true,
})
export class MemberIssueDTO extends Base {
  @FilterableField(() => Int, { nullable: true })
  memberId?: number;

  @FilterableField(() => Int, { nullable: true })
  issueId?: number;

  @FilterableField(() => MemberIssueRoleEnum, { nullable: true })
  role?: MemberIssueRoleEnum;
}
