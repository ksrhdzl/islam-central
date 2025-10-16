import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createType('market_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await factory(db, 'market')
    .addColumn('region_id', 'bigint', (cb) => cb.notNull().references('region.id'))
    .addColumn('channel_id', 'bigint', (cb) => cb.notNull().references('channel.id'))
    .addColumn('compliance', 'jsonb', (col) => col.defaultTo('{}').notNull())
    .addColumn('status', sql`market_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::market_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('market_deleted_at_index')
    .on('market')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('market').ifExists().execute();
  await db.schema.dropType('market_status_enum').ifExists().execute();
};
