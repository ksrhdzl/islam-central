import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './common';
import { MemberEntity } from './member.entity';
import { ProjectEntity } from './project.entity';

export enum MemberProjectRoleEnum {
  MANAGER = 'manager',
  MEMBER = 'member',
}
registerEnumType(MemberProjectRoleEnum, { name: 'MemberProjectRoleEnum' });

@Entity('member_project')
export class MemberProjectEntity extends Base {
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

  @Column({ name: 'project_id', type: 'int' })
  projectId!: number;

  @ManyToOne(() => ProjectEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project?: ProjectEntity;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'member_project_role_enum',
    enum: MemberProjectRoleEnum,
    default: MemberProjectRoleEnum.MEMBER,
  })
  role!: MemberProjectRoleEnum;
}
