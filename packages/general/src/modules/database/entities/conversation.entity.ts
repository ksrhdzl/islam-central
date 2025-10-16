import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { Base } from './common';
import { MessageEntity } from './message.entity';
import { WorkspaceEntity } from './workspace.entity';

export enum ConversationTypeEnum {
  CHAT = 'chat',
  CALL = 'call',
  MEET = 'meet',

  GROUP = 'group',
  Channel = 'channel',
}

@Entity('conversation')
export class ConversationEntity extends Base {
  @Column({ name: 'name', type: 'varchar', nullable: true })
  name!: string;

  @Column({ name: 'type', type: 'varchar' })
  type!: string;

  @Column({ name: 'slug', type: 'varchar', nullable: true })
  slug!: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description!: string;

  @Column({ name: 'workspace_id', type: 'int' })
  workspaceId!: number;

  @ManyToOne(() => WorkspaceEntity, (obj) => obj.conversations, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace?: WorkspaceEntity;

  @ManyToMany(() => MessageEntity, (obj) => obj.conversations)
  messages?: MessageEntity[];
}
