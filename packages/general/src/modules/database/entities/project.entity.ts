import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Base } from './common';
import { IssueEntity } from './issue.entity';
import { WorkspaceEntity } from './workspace.entity';

@Entity('project')
export class ProjectEntity extends Base {
  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'slug', type: 'varchar' })
  slug!: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description!: string;

  // @Column({ name: 'type', type: 'varchar' })
  // type!: string;

  @Column({ name: 'workspace_id', type: 'int' })
  workspaceId!: number;

  @ManyToOne(() => WorkspaceEntity, (obj) => obj.projects, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace?: WorkspaceEntity;

  @OneToMany(() => IssueEntity, (obj) => obj.project, {
    nullable: true,
  })
  issues?: IssueEntity[];
}
