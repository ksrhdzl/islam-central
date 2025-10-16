import { sql, type Kysely } from 'kysely';

export const factory = (db: Kysely<any>, name: string) => {
  return db.schema
    .createTable(name)
    .addColumn('id', 'bigint', (column) => column.generatedByDefaultAsIdentity().primaryKey())
    .addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}').notNull())
    .addColumn('version', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('updated_at', 'timestamp', (column) => column.defaultTo(sql`now()`).notNull())
    .addColumn('created_at', 'timestamp', (column) => column.defaultTo(sql`now()`).notNull())
    .addColumn('deleted_at', 'timestamp');
};
