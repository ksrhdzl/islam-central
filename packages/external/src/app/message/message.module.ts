import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { MessageEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateMessageInput } from './dto/create-message.input';
import { MessageDTO } from './dto/message.dto';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MessageEntity])],
      resolvers: [
        {
          EntityClass: MessageEntity,
          DTOClass: MessageDTO,
          CreateDTOClass: CreateMessageInput,
          UpdateDTOClass: UpdateMessageInput,
          read: {
            many: { name: 'messages' },
            one: { name: 'message' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'MessageConnection',
            defaultSort: [
              {
                field: 'id',
                direction: SortDirection.ASC,
                nulls: SortNulls.NULLS_LAST,
              },
            ],
            pagingStrategy: PagingStrategies.CURSOR,
            enableTotalCount: true,
          },
          create: {
            many: { disabled: true },
            one: { name: 'createMessage' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateMessage' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteMessage' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [MessageService, MessageResolver],
  exports: [MessageService],
})
export class MessageModule {}
