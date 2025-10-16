import { Int, ObjectType } from '@nestjs/graphql';
import { FilterableField, Relation } from '@ptc-org/nestjs-query-graphql';
import { MemberRoleEnum } from 'general';
import { UserDTO } from '@/app/user/dto/user.dto';
import { WorkspaceDTO } from '@/app/workspace/dto/workspace.dto';
import { Base } from '@/dto';

@ObjectType('Member')
@Relation('workspace', () => WorkspaceDTO, {
  nullable: true,
})
@Relation('user', () => UserDTO, {
  nullable: true,
})
export class MemberDTO extends Base {
  @FilterableField(() => Int, { nullable: true })
  workspaceId?: number;

  @FilterableField(() => MemberRoleEnum, { nullable: true })
  role?: MemberRoleEnum;

  @FilterableField(() => Int, { nullable: true })
  userId?: number;
}
