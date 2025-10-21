import { Migration, type Kysely } from 'kysely';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {};

export const down: Migration['down'] = async (
  db: Kysely<any>,
): Promise<void> => {};
