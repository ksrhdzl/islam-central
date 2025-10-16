import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './common';
import { IssueEntity } from './issue.entity';
import { MemberEntity } from './member.entity';

export enum MemberIssueRoleEnum {
  MANAGER = 'manager',
  MEMBER = 'member',
}
registerEnumType(MemberIssueRoleEnum, { name: 'MemberIssueRoleEnum' });

@Entity('member_issue')
export class MemberIssueEntity extends Base {
  @Column({ name: 'member_id', type: 'int' })
  memberId!: number;

  @ManyToOne(() => MemberEntity, {
    nullable: true,
  })
  @JoinColumn({
    name: 'member_id',
    referencedColumnName: 'id',
  })
  member?: MemberEntity;

  @Column({ name: 'issue_id', type: 'int' })
  issueId!: number;

  @ManyToOne(() => IssueEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'issue_id',
    referencedColumnName: 'id',
  })
  issue?: IssueEntity;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'member_issue_role_enum',
    enum: MemberIssueRoleEnum,
    default: MemberIssueRoleEnum.MEMBER,
  })
  role!: MemberIssueRoleEnum;
}
