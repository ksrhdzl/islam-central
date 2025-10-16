import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createType('setting_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();
  await db.schema.createType('setting_type_enum').asEnum(['private', 'public']).execute();

  await factory(db, 'setting')
    .addColumn('name', 'varchar', (cb) => cb)
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('content', 'jsonb', (col) => col.defaultTo('{}').notNull())
    .addColumn('type', sql`setting_type_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'private'::setting_type_enum`),
    )
    .addColumn('status', sql`setting_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::setting_status_enum`),
    )
    .execute();

  //  await qr.query(/* sql */ `
  //   CREATE TABLE tag (
  //     id INTEGER GENERATED ALWAYS AS IDENTITY (SEQUENCE NAME tag_id_seq) CONSTRAINT tag_id_pkey PRIMARY KEY,
  //     --
  //     slug VARCHAR NOT NULL CONSTRAINT tag_slug_key UNIQUE
  //   );

  //   CREATE INDEX tag_deleted_at_idx ON tag USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // `);

  await db.schema
    .createIndex('setting_deleted_at_index')
    .on('setting')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'asset')
    .addColumn('slug', 'varchar', (cb) => cb.notNull())
    .addColumn('source', 'varchar', (cb) => cb.notNull())
    .addColumn('type', 'varchar', (cb) => cb)
    .addColumn('size', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createIndex('asset_deleted_at_index')
    .on('asset')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'asset_local')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('summary', 'text', (cb) => cb)
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('language', 'varchar', (cb) => cb)
    .addColumn('base_id', 'bigint', (cb) => cb.notNull().references('asset.id'))
    .addUniqueConstraint('asset_local_language_base_id_key', ['language', 'base_id'], (cb) => cb)
    .execute();

  await db.schema
    .createIndex('asset_local_language_index')
    .on('asset_local')
    .column('language')
    .where('language', 'is not', null)
    .execute();

  await db.schema
    .createType('seo_changefreq_enum')
    .asEnum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
    .execute();

  await factory(db, 'seo')
    .addColumn('index', 'boolean', (cb) => cb.defaultTo(false).notNull())
    .addColumn('follow', 'varchar', (cb) => cb.defaultTo(false).notNull())
    .addColumn('changefreq', sql`seo_changefreq_enum`, (cb) =>
      cb.defaultTo(sql`'weekly'::seo_changefreq_enum`).notNull(),
    )
    .addColumn('priority', sql`decimal(2, 1)`, (cb) =>
      cb
        .defaultTo(0.5)
        .notNull()
        .check(sql`
          priority >= 0.0
          AND priority <= 1.0
        `),
    )
    .addColumn('title', 'varchar', (cb) => cb)
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('keywords', sql`varchar[]`, (cb) => cb.defaultTo('{}').notNull())
    .addColumn('canonical_url', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createIndex('seo_deleted_at_index')
    .on('seo')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('seo').ifExists().execute();
  await db.schema.dropType('seo_changefreq_enum').ifExists().execute();
  await db.schema.dropTable('asset_local').ifExists().execute();
  await db.schema.dropTable('asset').ifExists().execute();
  await db.schema.dropTable('setting').ifExists().execute();
  await db.schema.dropType('setting_status_enum').ifExists().execute();
  await db.schema.dropType('setting_type_enum').ifExists().execute();
};
