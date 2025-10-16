import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { WorkspaceEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateWorkspaceInput } from './dto/create-workspace.input';
import { UpdateWorkspaceInput } from './dto/update-workspace.input';
import { WorkspaceDTO } from './dto/workspace.dto';
import { WorkspaceResolver } from './workspace.resolver';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([WorkspaceEntity])],
      resolvers: [
        {
          EntityClass: WorkspaceEntity,
          DTOClass: WorkspaceDTO,
          CreateDTOClass: CreateWorkspaceInput,
          UpdateDTOClass: UpdateWorkspaceInput,
          read: {
            many: { name: 'workspaces' },
            one: { name: 'workspace' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'WorkspaceConnection',
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
            one: { name: 'createWorkspace' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateWorkspace' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteWorkspace' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [WorkspaceService, WorkspaceResolver],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
