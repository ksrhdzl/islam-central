import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './common';
import { ProjectEntity } from './project.entity';
import { WorkspaceEntity } from './workspace.entity';

export enum IssueStatusEnum {
  BACKLOG = 'backlog',
  TODO = 'todo',
  INPROGRESS = 'in progress',
  INREVIEW = 'in review',
  DONE = 'done',
}
registerEnumType(IssueStatusEnum, { name: 'IssueStatusEnum' });

@Entity('issue')
export class IssueEntity extends Base {
  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'slug', type: 'varchar' })
  slug!: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description!: string;

  @Column({ name: 'workspace_id', type: 'int' })
  workspaceId!: number;

  @ManyToOne(() => WorkspaceEntity, (obj) => obj.issues, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace?: WorkspaceEntity;

  @Column({ name: 'project_id', type: 'int' })
  projectId!: number;

  @ManyToOne(() => ProjectEntity, (obj) => obj.issues, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
    referencedColumnName: 'id',
  })
  project?: ProjectEntity;

  @Column({ name: 'position', type: 'int' })
  position!: number;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'issue_status_enum',
    enum: IssueStatusEnum,
    default: IssueStatusEnum.TODO,
  })
  status!: IssueStatusEnum;

  @Column({ name: 'start_at', type: 'timestamp', nullable: true })
  startAt?: Date | null;

  @Column({ name: 'end_at', type: 'timestamp', nullable: true })
  endAt?: Date | null;

  // @ManyToMany(() => MessageEntity, (obj) => obj.issues)
  // messages?: MessageEntity[];

  // @Column({ name: 'parent_id', type: 'int', nullable: true })
  // parentId?: number;

  // @ManyToOne(() => IssueEntity, (obj) => obj.subs, { nullable: true })
  // @JoinColumn({
  //   name: 'parent_id',
  //   referencedColumnName: 'id',
  // })
  // parent?: IssueEntity;

  // @OneToMany(() => IssueEntity, (obj) => obj.parent, { nullable: true })
  // subs?: IssueEntity[];
}
