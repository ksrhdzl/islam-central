import { Logger, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { DatabaseMigrator } from './utilities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          schema: 'public',
          type: 'postgres',
          url: configService.get<string>('POSTGRES'),
          // host: configService.get<string>('POSTGRES_HOST'),
          // port: configService.get<number>('POSTGRES_PORT'),
          // user: configService.get<string>('POSTGRES_USER'),
          // password: configService.get<string>('POSTGRES_PASSWORD'),
          // database: configService.get<string>('POSTGRES_DB'),
          entities: [`${__dirname}/entities/**/*.entity.{js,ts}`],
          subscribers: [`${__dirname}/subscribers/**/*.subscriber.{js,ts}`],
          logging: configService.get<string>('NODE_ENV') !== 'production',
        } as DataSourceOptions;
      },
    }),
  ],
  providers: [
    {
      provide: DatabaseMigrator,
      useFactory: (configService: ConfigService) => {
        return new DatabaseMigrator({
          host: configService.get<string>('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          user: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
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
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Down();
      await this.databaseMigrator.Latest();
    } catch (error) {
      this.logger.error('Error during migrations:', error.stack || error);
    } finally {
      await this.databaseMigrator.destroy();
    }
  }
  async onModuleDestroy() {
    await this.databaseMigrator.destroy();
  }
}
