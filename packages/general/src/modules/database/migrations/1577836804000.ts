import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  // await qr.query(/* sql */ `
  //     CREATE TABLE zone_type (
  //       id INTEGER GENERATED ALWAYS AS IDENTITY (SEQUENCE NAME zone_type_id_seq) CONSTRAINT zone_type_id_pkey PRIMARY KEY,
  //       --
  //       slug VARCHAR NOT NULL CONSTRAINT zone_type_slug_key UNIQUE
  //       --
  //     );

  //     CREATE INDEX zone_type_deleted_at_idx ON zone_type USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   `);

  //   await qr.query(/* sql */ `
  //     CREATE TABLE zone_type_local (
  //       id INTEGER GENERATED ALWAYS AS IDENTITY (SEQUENCE NAME zone_type_local_id_seq) CONSTRAINT zone_type_local_id_pkey PRIMARY KEY,
  //       --
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT zone_type_local_zone_type_base_id_fkey FOREIGN KEY (base_id) REFERENCES zone_type (id),
  //       CONSTRAINT zone_type_language_base_id_key UNIQUE (language, base_id)
  //     );

  //     CREATE INDEX zone_type_local_language_idx ON zone_type_local USING btree (language);
  //   `);
  // TODO
  await db.schema
    .createType('zone_type_enum')
    .asEnum(['continent', 'country', 'province', 'city', 'village'])
    .execute();

  await factory(db, 'zone')
    .addColumn('slug', 'varchar', (cb) => cb.notNull())
    .addColumn('parent_id', 'bigint', (cb) =>
      cb.references('zone.id').check(sql`
        parent_id IS NULL
        OR (
          parent_id <> id
          AND parent_id IS NOT NULL
        )
      `),
    )
    .execute();

  await db.schema
    .createIndex('zone_slug_index')
    .on('zone')
    .column('slug')
    .where('slug', 'is not', null)
    .execute();

  await db.schema
    .createIndex('zone_parent_id_index')
    .on('zone')
    .column('parent_id')
    .where('parent_id', 'is not', null)
    .execute();

  await db.schema
    .createIndex('zone_deleted_at_index')
    .on('zone')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'zone_local')
    .addColumn('name', 'varchar', (cb) => cb.notNull())
    .addColumn('language', 'varchar', (cb) => cb)
    .addColumn('base_id', 'bigint', (cb) => cb.notNull().references('zone.id'))
    .addUniqueConstraint('zone_local_language_base_id_key', ['language', 'base_id'], (cb) => cb)
    .execute();

  await db.schema
    .createIndex('zone_local_language_index')
    .on('zone_local')
    .column('language')
    .where('language', 'is not', null)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('zone_local').ifExists().execute();
  await db.schema.dropTable('zone').ifExists().execute();
  await db.schema.dropType('zone_type_enum').ifExists().execute();
};
