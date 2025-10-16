import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { MemberProjectEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateMemberProjectInput } from './dto/create-member-project.input';
import { MemberProjectDTO } from './dto/member-project.dto';
import { UpdateMemberProjectInput } from './dto/update-member-project.input';
import { MemberProjectResolver } from './member-project.resolver';
import { MemberProjectService } from './member-project.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MemberProjectEntity])],
      resolvers: [
        {
          EntityClass: MemberProjectEntity,
          DTOClass: MemberProjectDTO,
          CreateDTOClass: CreateMemberProjectInput,
          UpdateDTOClass: UpdateMemberProjectInput,
          read: {
            many: { name: 'memberProjects' },
            one: { name: 'memberProject' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'MemberProjectConnection',
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
            one: { name: 'createMemberProject' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateMemberProject' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteMemberProject' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [MemberProjectService, MemberProjectResolver],
  exports: [MemberProjectService],
})
export class MemberProjectModule {}
