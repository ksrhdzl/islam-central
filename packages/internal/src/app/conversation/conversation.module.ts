import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ConversationEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { ConversationDTO } from './dto/conversation.dto';
import { CreateConversationInput } from './dto/create-conversation.input';
import { UpdateConversationInput } from './dto/update-conversation.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ConversationEntity])],
      resolvers: [
        {
          EntityClass: ConversationEntity,
          DTOClass: ConversationDTO,
          CreateDTOClass: CreateConversationInput,
          UpdateDTOClass: UpdateConversationInput,
          read: {
            many: { name: 'conversations' },
            one: { name: 'conversation' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'ConversationConnection',
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
            one: { name: 'createConversation' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateConversation' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteConversation' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [ConversationService, ConversationResolver],
  exports: [ConversationService],
})
export class ConversationModule {}
