import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, 'region')
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('language', 'varchar', (cb) => cb.notNull())
    .addColumn('currency', 'varchar', (cb) => cb.notNull())
    .addColumn('timezone', 'varchar', (cb) => cb.notNull())
    .addColumn('weight_unit', sql`weight_unit_enum`, (cb) => cb.notNull())
    .addColumn('dimension_unit', sql`dimension_unit_enum`, (cb) => cb.notNull())
    .addColumn('parent_id', 'bigint', (cb) =>
      cb.references('region.id').check(sql`
        parent_id IS NULL
        OR (
          parent_id <> id
          AND parent_id IS NOT NULL
        )
      `),
    )
    .execute();

  await db.schema
    .createIndex('region_deleted_at_index')
    .on('region')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'region_local')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('summary', 'text', (cb) => cb)
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('language', 'varchar', (cb) => cb)
    .addColumn('base_id', 'bigint', (cb) => cb.notNull().references('region.id'))
    .addUniqueConstraint('region_local_language_base_id_key', ['language', 'base_id'], (cb) => cb)
    .execute();

  await db.schema
    .createIndex('region_local_language_index')
    .on('region_local')
    .column('language')
    .where('language', 'is not', null)
    .execute();

  await db.schema
    .createTable('region_zone')
    .addColumn('created_at', 'timestamp', (column) => column.defaultTo(sql`now()`).notNull())
    .addColumn('region_id', 'bigint', (cb) => cb.notNull().references('region.id'))
    .addColumn('zone_id', 'bigint', (cb) => cb.notNull().references('zone.id'))
    .addPrimaryKeyConstraint('region_zone_pkey', ['region_id', 'zone_id'], (cb) => cb)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('region_zone').ifExists().execute();
  await db.schema.dropTable('region_local').ifExists().execute();
  await db.schema.dropTable('region').ifExists().execute();
};
