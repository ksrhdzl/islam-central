import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ProjectEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateProjectInput } from './dto/create-project.input';
import { ProjectDTO } from './dto/project.dto';
import { UpdateProjectInput } from './dto/update-project.input';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ProjectEntity])],
      resolvers: [
        {
          EntityClass: ProjectEntity,
          DTOClass: ProjectDTO,
          CreateDTOClass: CreateProjectInput,
          UpdateDTOClass: UpdateProjectInput,
          read: {
            many: { name: 'projects' },
            one: { name: 'project' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'ProjectConnection',
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
            one: { name: 'createProject' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateProject' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteProject' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
