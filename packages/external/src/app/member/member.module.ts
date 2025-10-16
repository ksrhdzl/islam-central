import { Module } from '@nestjs/common';
import { SortDirection, SortNulls } from '@ptc-org/nestjs-query-core';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { MemberEntity } from 'general';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { CreateMemberInput } from './dto/create-member.input';
import { MemberDTO } from './dto/member.dto';
import { UpdateMemberInput } from './dto/update-member.input';
import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MemberEntity])],
      resolvers: [
        {
          EntityClass: MemberEntity,
          DTOClass: MemberDTO,
          CreateDTOClass: CreateMemberInput,
          UpdateDTOClass: UpdateMemberInput,
          read: {
            many: { name: 'members' },
            one: { name: 'member' },
            defaultResultSize: 10,
            maxResultsSize: -1,
            connectionName: 'MemberConnection',
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
            one: { name: 'createMember' },
          },
          update: {
            many: { disabled: true },
            one: { name: 'updateMember' },
          },
          delete: {
            many: { disabled: true },
            one: { disabled: false, name: 'deleteMember' },
          },
          guards: [AuthMiddleware],
        },
      ],
    }),
  ],
  providers: [MemberService, MemberResolver],
  exports: [MemberService],
})
export class MemberModule {}
