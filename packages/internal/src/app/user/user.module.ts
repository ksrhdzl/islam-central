import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { UserEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([UserEntity])],
      resolvers: [
        {
          EntityClass: UserEntity,
          DTOClass: UserDTO,
          CreateDTOClass: CreateUserInput,
          UpdateDTOClass: UpdateUserInput,
          read: {
            many: { name: 'users' },
            one: { name: 'user' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'UserConnection',
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
            one: { name: 'createUser' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateUser' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteUser' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
