import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { MemberIssueEntity } from 'general';
import { AuthMiddleware } from '@/app/auth/middlewares/auth.middleware';

import { CreateMemberIssueInput } from './dto/create-member-issue.input';
import { MemberIssueDTO } from './dto/member-issue.dto';
import { UpdateMemberIssueInput } from './dto/update-member-issue.input';
import { MemberIssueResolver } from './member-issue.resolver';
import { MemberIssueService } from './member-issue.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MemberIssueEntity])],
      resolvers: [
        {
          EntityClass: MemberIssueEntity,
          DTOClass: MemberIssueDTO,
          CreateDTOClass: CreateMemberIssueInput,
          UpdateDTOClass: UpdateMemberIssueInput,
          read: {
            many: { name: 'memberIssues' },
            one: { name: 'memberIssue' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'MemberIssueConnection',
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
            one: { name: 'createMemberIssue' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateMemberIssue' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteMemberIssue' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [MemberIssueService, MemberIssueResolver],
  exports: [MemberIssueService],
})
export class MemberIssueModule {}
