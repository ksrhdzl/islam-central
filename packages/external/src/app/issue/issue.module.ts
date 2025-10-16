import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { IssueEntity } from 'general';
import { AuthMiddleware } from '@/app/auth/middlewares/auth.middleware';

import { CreateIssueInput } from './dto/create-issue.input';
import { IssueDTO } from './dto/issue.dto';
import { UpdateIssueInput } from './dto/update-issue.input';
import { IssueResolver } from './issue.resolver';
import { IssueService } from './issue.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([IssueEntity])],
      resolvers: [
        {
          EntityClass: IssueEntity,
          DTOClass: IssueDTO,
          CreateDTOClass: CreateIssueInput,
          UpdateDTOClass: UpdateIssueInput,
          read: {
            many: { name: 'issues' },
            one: { name: 'issue' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'IssueConnection',
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
            one: { name: 'createIssue' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateIssue' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteIssue' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [IssueService, IssueResolver],
  exports: [IssueService],
})
export class IssueModule {}
