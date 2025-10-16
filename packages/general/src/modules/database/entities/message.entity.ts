import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { Base } from './common';
import { ConversationEntity } from './conversation.entity';
import { MemberEntity } from './member.entity';
import { WorkspaceEntity } from './workspace.entity';

@Entity('message')
export class MessageEntity extends Base {
  @Column({ name: 'content', type: 'varchar' })
  content!: string;

  @Column({ name: 'type', type: 'varchar' })
  type!: string;

  @Column({ name: 'workspace_id', type: 'int' })
  workspaceId!: number;

  @ManyToOne(() => WorkspaceEntity, (obj) => obj.messages, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'workspace_id',
    referencedColumnName: 'id',
  })
  workspace?: WorkspaceEntity;

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

  @ManyToMany(() => ConversationEntity, (obj) => obj.messages)
  @JoinTable({
    name: 'message_conversation',
    joinColumn: { name: 'message_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
  })
  conversations?: ConversationEntity[];

  // @ManyToMany(() => IssueEntity, (obj) => obj.messages)
  // @JoinTable({
  //   name: "message_issue",
  //   joinColumn: { name: "message_id", referencedColumnName: "id" },
  //   inverseJoinColumn: { name: "issue_id", referencedColumnName: "id" },
  // })
  // issues?: IssueEntity[];

  // @Column({ name: "parent_id", type: "int", nullable: true })
  // parentId?: number;

  // @ManyToOne(() => MessageEntity, (obj) => obj.subs, { nullable: true })
  // @JoinColumn({
  //   name: "parent_id",
  //   referencedColumnName: "id",
  // })
  // parent?: MessageEntity;

  // @OneToMany(() => MessageEntity, (obj) => obj.parent, { nullable: true })
  // subs?: MessageEntity[];
}

// table SEEN MESSAGES
// messageID
// memberID
