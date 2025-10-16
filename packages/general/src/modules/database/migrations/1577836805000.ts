import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createType('api_key_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await db.schema.createType('api_key_type_enum').asEnum(['internal', 'external']).execute();

  await factory(db, 'api_key')
    .addColumn('name', 'varchar', (cb) => cb)
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('type', sql`api_key_type_enum`, (cb) => cb.notNull())
    .addColumn('token', 'text', (cb) => cb)
    .addColumn('salt', 'text', (cb) => cb)
    .addColumn('redact', 'varchar', (cb) => cb)
    .addColumn('created_by', 'varchar', (cb) => cb.notNull())
    .addColumn('revoked_by', 'varchar', (cb) => cb)
    .addColumn('revoked_at', 'timestamp', (cb) => cb)
    .addColumn('status', sql`api_key_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::api_key_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('api_key_deleted_at_index')
    .on('api_key')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await db.schema
    .createType('channel_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await factory(db, 'channel')
    .addColumn('name', 'varchar', (cb) => cb)
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('status', sql`channel_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::channel_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('channel_deleted_at_index')
    .on('channel')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await db.schema
    .createTable('channel_api_key')
    .addColumn('created_at', 'timestamp', (column) => column.defaultTo(sql`now()`).notNull())
    .addColumn('channel_id', 'bigint', (cb) => cb.notNull().references('channel.id'))
    .addColumn('api_key_id', 'bigint', (cb) => cb.notNull().references('api_key.id'))
    .addPrimaryKeyConstraint('channel_api_key_pkey', ['channel_id', 'api_key_id'], (cb) => cb)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('channel_api_key').ifExists().execute();
  await db.schema.dropTable('channel').ifExists().execute();
  await db.schema.dropType('channel_status_enum').ifExists().execute();
  await db.schema.dropTable('api_key').ifExists().execute();
  await db.schema.dropType('api_key_status_enum').ifExists().execute();
  await db.schema.dropType('api_key_type_enum').ifExists().execute();
};
