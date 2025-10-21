import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

import { KyselyModule } from '../kysely';
import { DatabaseService } from './database.service';
import { DatabaseMigrator } from './utilities';

@Module({
  imports: [
    KyselyModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: new PostgresDialect({
            pool: new Pool({
              connectionString:
                configService.getOrThrow<string>('POSTGRES_URL'),
            }),
          }),
        };
      },
    }),
  ],
  providers: [
    {
      provide: DatabaseMigrator,
      useFactory: (configService: ConfigService) => {
        return new DatabaseMigrator({
          connectionString: configService.getOrThrow<string>('POSTGRES_URL'),
        });
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly databaseMigrator: DatabaseMigrator) {}

  async onModuleInit() {
    try {
      await this.databaseMigrator.Latest();
    } catch (error) {
      this.logger.error('Error during migrations:', error);
    } finally {
      await this.databaseMigrator.destroy();
    }
  }
  async onModuleDestroy() {
    await this.databaseMigrator.destroy();
  }
}
