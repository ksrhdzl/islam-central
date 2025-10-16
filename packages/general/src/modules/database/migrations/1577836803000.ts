import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, 'language')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('slug', 'varchar', (cb) => cb.unique().notNull())
    .execute();

  await db.schema
    .createIndex('language_deleted_at_index')
    .on('language')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'language_local')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('language', 'varchar', (cb) => cb)
    .addColumn('base_id', 'bigint', (cb) => cb.notNull().references('language.id'))
    .addUniqueConstraint(
      'language_local_language_base_id_key',
      ['language', 'base_id'],
      (cb) => cb,
    )
    .execute();

  await db.schema
    .createIndex('language_local_language_index')
    .on('language_local')
    .column('language')
    .where('language', 'is not', null)
    .execute();

  await factory(db, 'currency')
    .addColumn('slug', 'varchar', (cb) => cb.unique().notNull())
    .addColumn('symbol', 'varchar', (cb) => cb.notNull())
    .addColumn('scale', 'integer', (cb) => cb.defaultTo(0).notNull())
    .addColumn('round', 'real', (cb) => cb.defaultTo(0.0).notNull())
    .execute();

  await db.schema
    .createIndex('currency_deleted_at_index')
    .on('currency')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'currency_local')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('symbol', 'varchar', (cb) => cb.notNull())
    .addColumn('language', 'varchar', (cb) => cb)
    .addColumn('base_id', 'bigint', (cb) => cb.notNull().references('currency.id'))
    .addUniqueConstraint(
      'currency_local_language_base_id_key',
      ['language', 'base_id'],
      (cb) => cb,
    )
    .execute();

  await db.schema
    .createIndex('currency_local_language_index')
    .on('currency_local')
    .column('language')
    .where('language', 'is not', null)
    .execute();

  await factory(db, 'currency_rate')
    .addColumn('from_currency_id', 'bigint', (cb) => cb.notNull().references('currency.id'))
    .addColumn('to_currency_id', 'bigint', (cb) => cb.notNull().references('currency.id'))
    .addColumn('rate', 'varchar', (cb) => cb.notNull())
    .execute();

  await db.schema
    .createIndex('currency_rate_deleted_at_index')
    .on('currency_rate')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await db.schema.createType('price_type_enum').asEnum(['static', 'dynamic']).execute();

  await factory(db, 'price')
    .addColumn('currency', 'varchar', (cb) => cb.notNull())
    .addColumn('type', sql`price_type_enum`, (cb) => cb.notNull())
    .addColumn('amount', 'varchar', (cb) => cb.notNull())
    .execute();

  await db.schema
    .createIndex('price_deleted_at_index')
    .on('price')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('price').ifExists().execute();
  await db.schema.dropType('price_type_enum').ifExists().execute();
  await db.schema.dropTable('currency_rate').ifExists().execute();
  await db.schema.dropTable('currency_local').ifExists().execute();
  await db.schema.dropTable('currency').ifExists().execute();
  await db.schema.dropTable('language_local').ifExists().execute();
  await db.schema.dropTable('language').ifExists().execute();
};
