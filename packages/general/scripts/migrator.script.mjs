#!/usr/bin/env node

import 'reflect-metadata';

import path from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'team',
  migrations: [`${__dirname}/../dist/modules/database/migrations/**/*.{js,ts}`],
  // migrationsTableName: 'migration',
  // migrationsTransactionMode: 'all',
  // entities: [
  //   `${__dirname}/../dist/modules/database/entities/**/*.entity.{js,ts}`,
  // ],
  synchronize: false,
  logging: true,
});

async function runMigrations() {
  try {
    console.log('Connecting to database...');
    await dataSource.initialize();
    console.log('Running migrations...');
    await dataSource.runMigrations();
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

async function revertMigration() {
  try {
    console.log('Connecting to database...');
    await dataSource.initialize();
    console.log('Reverting last migration...');
    await dataSource.undoLastMigration();
    console.log('Migration reverted successfully');
  } catch (error) {
    console.error('Error reverting migration:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

yargs(hideBin(process.argv))
  .command('run', 'Run all pending migrations', () => {}, runMigrations)
  .command(
    'revert',
    'Revert the last executed migration',
    () => {},
    revertMigration,
  )
  .parse();
