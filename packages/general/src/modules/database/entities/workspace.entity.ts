import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from './common';
import { ConversationEntity } from './conversation.entity';
import { IssueEntity } from './issue.entity';
import { MemberEntity } from './member.entity';
import { MessageEntity } from './message.entity';
import { ProjectEntity } from './project.entity';

@Entity('workspace')
export class WorkspaceEntity extends Base {
  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'slug', type: 'varchar' })
  slug!: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  image?: string;

  @OneToMany(() => ConversationEntity, (obj) => obj.workspace, {
    nullable: true,
  })
  conversations?: ConversationEntity[];

  @OneToMany(() => ProjectEntity, (obj) => obj.workspace, {
    nullable: true,
  })
  projects?: ProjectEntity[];

  @OneToMany(() => MessageEntity, (obj) => obj.workspace, {
    nullable: true,
  })
  messages?: MessageEntity[];

  @OneToMany(() => IssueEntity, (obj) => obj.workspace, {
    nullable: true,
  })
  issues?: IssueEntity[];

  @OneToMany(() => MemberEntity, (obj) => obj.workspace, {
    nullable: true,
  })
  members?: MemberEntity[];
}
