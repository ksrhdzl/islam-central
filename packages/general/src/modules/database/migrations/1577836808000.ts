import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createType('operator_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await factory(db, 'operator')
    .addColumn('name', 'varchar', (cb) => cb)
    .addColumn('avatar_id', 'bigint', (cb) => cb.references('asset.id'))
    .addColumn('identifier', 'varchar', (cb) => cb.notNull())
    .addColumn('status', sql`operator_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::operator_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('operator_identifier_unique_index')
    .on('operator')
    .column('identifier')
    .unique()
    .where('identifier', 'is not', null)
    .execute();

  await db.schema
    .createIndex('operator_deleted_at_index')
    .on('operator')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await db.schema
    .createType('operator_role_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await factory(db, 'operator_role')
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('permissions', sql`varchar[]`, (cb) => cb.notNull().defaultTo('{}'))
    .addColumn('status', sql`operator_role_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::operator_role_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('operator_role_deleted_at_index')
    .on('operator_role')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'operator_role_local')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('summary', 'text', (cb) => cb)
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('language', 'varchar', (cb) => cb)
    .addColumn('base_id', 'bigint', (cb) => cb.notNull().references('operator_role.id'))
    .addUniqueConstraint(
      'operator_role_local_language_base_id_key',
      ['language', 'base_id'],
      (cb) => cb,
    )
    .execute();

  await db.schema
    .createIndex('operator_role_local_language_index')
    .on('operator_role_local')
    .column('language')
    .where('language', 'is not', null)
    .execute();

  await db.schema
    .createTable('operator_role_operator')
    .addColumn('created_at', 'timestamp', (column) => column.defaultTo(sql`now()`).notNull())
    .addColumn('operator_role_id', 'bigint', (cb) => cb.notNull().references('operator_role.id'))
    .addColumn('operator_id', 'bigint', (cb) => cb.notNull().references('operator.id'))
    .addPrimaryKeyConstraint(
      'operator_role_operator_pkey',
      ['operator_role_id', 'operator_id'],
      (cb) => cb,
    )
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('operator_role_operator').ifExists().execute();
  await db.schema.dropTable('operator_role_local').ifExists().execute();
  await db.schema.dropTable('operator_role').ifExists().execute();
  await db.schema.dropType('operator_role_status_enum').ifExists().execute();
  await db.schema.dropTable('operator').ifExists().execute();
  await db.schema.dropType('operator_status_enum').ifExists().execute();
};
