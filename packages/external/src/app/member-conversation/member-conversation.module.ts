import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { MemberConversationEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateMemberConversationInput } from './dto/create-member-conversation.input';
import { MemberConversationDTO } from './dto/member-conversation.dto';
import { UpdateMemberConversationInput } from './dto/update-member-conversation.input';
import { MemberConversationResolver } from './member-conversation.resolver';
import { MemberConversationService } from './member-conversation.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([MemberConversationEntity]),
      ],
      resolvers: [
        {
          EntityClass: MemberConversationEntity,
          DTOClass: MemberConversationDTO,
          CreateDTOClass: CreateMemberConversationInput,
          UpdateDTOClass: UpdateMemberConversationInput,
          read: {
            many: { name: 'memberConversations' },
            one: { name: 'memberConversation' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'MemberConversationConnection',
            defaultSort: [
              {
                field: 'id',
                direction: SortDirection.ASC,
                nulls: SortNulls.NULLS_LAST,
              },
            ],
            pagingStrategy: PagingStrategies.OFFSET,
            enableTotalCount: true,
          },
          create: {
            many: { disabled: true },
            one: { name: 'createMemberConversation' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateMemberConversation' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteMemberConversation' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [MemberConversationService, MemberConversationResolver],
  exports: [MemberConversationService],
})
export class MemberConversationModule {}
