import { promises as fs } from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import { Pool, PoolConfig } from 'pg';

export class DatabaseMigrator {
  private database: Kysely<any>;
  private readonly logger = new Logger(DatabaseMigrator.name);
  private migrator: Migrator;

  constructor(config: PoolConfig) {
    this.database = new Kysely({
      dialect: new PostgresDialect({
        pool: new Pool(config),
      }),
    });

    this.migrator = new Migrator({
      db: this.database,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, './../migrations'),
      }),
      migrationTableName: 'migrations',
      migrationLockTableName: 'migretions',
      migrationTableSchema: 'public',
    });
  }

  async Latest() {
    try {
      const { error, results } = await this.migrator.migrateToLatest();

      results?.forEach((it) => {
        if (it.status === 'Success') {
          this.logger.log(
            `Migration "${it.migrationName}" was executed successfully.`,
          );
        } else if (it.status === 'Error') {
          this.logger.error(
            `Failed to execute migration "${it.migrationName}".`,
          );
        }
      });

      if (error) {
        this.logger.error('Failed to migrate', error);
        throw new Error('Migration process encountered an error.');
      }
      this.logger.log('All migrations executed successfully.');
    } catch (err) {
      this.logger.error('An unexpected error occurred during migration.', err);
      throw err;
    }
  }

  async Down() {
    try {
      await this.migrator.migrateDown();
    } catch (err) {
      this.logger.error('An unexpected error occurred during migration.', err);
      throw err;
    }
  }

  async destroy() {
    await this.database.destroy();
    this.logger.log('Database connection destroyed.');
  }
}
