import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Base } from './common';
import { ConversationEntity } from './conversation.entity';
import { MemberEntity } from './member.entity';

export enum MemberConversationRoleEnum {
  MANAGER = 'manager',
  MEMBER = 'member',
}
registerEnumType(MemberConversationRoleEnum, {
  name: 'MemberConversationRoleEnum',
});

@Entity('member_conversation')
export class MemberConversationEntity extends Base {
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

  @Column({ name: 'conversation_id', type: 'int' })
  conversationId!: number;

  @ManyToOne(() => ConversationEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'conversation_id',
    referencedColumnName: 'id',
  })
  conversation?: ConversationEntity;

  @Column({
    name: 'role',
    type: 'enum',
    enumName: 'member_conversation_role_enum',
    enum: MemberConversationRoleEnum,
    default: MemberConversationRoleEnum.MEMBER,
  })
  role!: MemberConversationRoleEnum;
}
