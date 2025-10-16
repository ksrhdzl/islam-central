import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ConsoleLogger,
  MiddlewareConsumer,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule, MinioModule } from 'general';

import { AssetModule } from './app/asset/asset.module';
import { AuthModule } from './app/auth/auth.module';
import { ConversationModule } from './app/conversation/conversation.module';
import { IssueModule } from './app/issue/issue.module';
import { MemberConversationModule } from './app/member-conversation/member-conversation.module';
import { MemberIssueModule } from './app/member-issue/member-issue.module';
import { MemberProjectModule } from './app/member-project/member-project.module';
import { MemberModule } from './app/member/member.module';
import { MessageModule } from './app/message/message.module';
import { ProjectModule } from './app/project/project.module';
import { UserModule } from './app/user/user.module';
import { WorkspaceModule } from './app/workspace/worksapce.module';
import { envValidate } from './utilities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidate,
      expandVariables: true,
    }),
    DatabaseModule,
    JwtModule.register({ global: true }),
    MinioModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          endPoint: configService.get<string>('STORAGE_ENDPOINT')!,
          accessKey: configService.get<string>('STORAGE_ACCESS')!,
          secretKey: configService.get<string>('STORAGE_SECRET')!,
          region: 'default',
          useSSL: configService.get<boolean>('STORAGE_SSL')!,
          port: configService.get<number>('STORAGE_PORT')!,
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          driver: ApolloDriver,
          autoSchemaFile: '/tmp/schema.gql',
          playground: false,
          plugins: [],
          path: '/',
          introspection: configService.get<string>('NODE_ENV') !== 'production',
          debug: configService.get<string>('NODE_ENV') !== 'production',
          subscriptions: {
            'graphql-ws': {
              path: '/',
              onConnect: (context: any) => {
                try {
                  // const request: Request = context.extra.request;
                  new ConsoleLogger().log(context);
                } catch (error) {
                  new ConsoleLogger().error(error);
                }
              },
            },
          },
        };
      },
    }),
    AssetModule,
    AuthModule,
    IssueModule,
    MemberModule,
    MemberIssueModule,
    MemberConversationModule,
    MemberProjectModule,
    ProjectModule,
    UserModule,
    WorkspaceModule,
    ConversationModule,
    MessageModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
})
export class AppModule {
  // static async register(): Promise<DynamicModule> {
  //   return;
  // }

  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }
}
