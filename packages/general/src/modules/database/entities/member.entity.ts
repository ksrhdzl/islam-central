import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './common';
import { UserEntity } from './user.entity';
import { WorkspaceEntity } from './workspace.entity';

//   ADMIN
//   MODERATOR
//   GUEST

export enum MemberRoleEnum {
  MANAGER = 'manager',
  MEMBER = 'member',
}
registerEnumType(MemberRoleEnum, { name: 'MemberRoleEnum' });

@Entity('member')
@Index(['workspaceId', 'userId'], { unique: true })
export class MemberEntity extends Base {
  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'member_role_enum',
    enum: MemberRoleEnum,
    default: MemberRoleEnum.MEMBER,
  })
  role!: MemberRoleEnum;

  @Column({ name: 'workspace_id', type: 'int' })
  workspaceId!: number;

  @ManyToOne(() => WorkspaceEntity, (obj) => obj.members, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace?: WorkspaceEntity;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @ManyToOne(() => UserEntity, (obj) => obj.members, {
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: UserEntity;
}
