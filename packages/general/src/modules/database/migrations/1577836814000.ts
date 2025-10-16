import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  //     await factory(db,"").execute()

  await db.schema
    .createType('shipping_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE shipping (
  //     slug VARCHAR NOT NULL CONSTRAINT shipping_slug_key UNIQUE,
  //     thumbnail_id INTEGER,
  //     status shipping_status_enum DEFAULT 'active'::shipping_status_enum NOT NULL,
  //     --
  //     CONSTRAINT shipping_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id)
  //   );
  //   CREATE INDEX shipping_deleted_at_idx ON shipping USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE shipping_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT shipping_local_shipping_base_id_fkey FOREIGN KEY (base_id) REFERENCES shipping (id),
  //     CONSTRAINT shipping_local_language_base_id_key UNIQUE (language, base_id)
  //   );
  //   CREATE INDEX shipping_local_language_idx ON shipping_local USING btree (language);
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE shipping_market (
  //     shipping_id INTEGER NOT NULL,
  //     market_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT shipping_market_shipping_id_market_id_pkey PRIMARY KEY (shipping_id, market_id),
  //     CONSTRAINT shipping_market_shipping_shipping_id_fkey FOREIGN KEY (shipping_id) REFERENCES shipping (id) ON DELETE CASCADE,
  //     CONSTRAINT shipping_market_market_market_id_fkey FOREIGN KEY (market_id) REFERENCES market (id) ON DELETE CASCADE
  //   );
  //   CREATE INDEX shipping_market_shipping_id_idx ON shipping_market USING btree (shipping_id);
  //   CREATE INDEX shipping_market_market_id_idx ON shipping_market USING btree (market_id);
  // ");
  // // -----
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('shipping_method_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE shipping_method (
  //     slug VARCHAR NOT NULL CONSTRAINT shipping_method_slug_key UNIQUE,
  //     shipping_id INTEGER NOT NULL,
  //     tracking_url VARCHAR,
  //     status shipping_method_status_enum DEFAULT 'active'::shipping_method_status_enum NOT NULL,
  //     --
  //     CONSTRAINT shipping_method_shipping_shipping_id_fkey FOREIGN KEY (shipping_id) REFERENCES shipping (id)
  //   );
  //   CREATE INDEX shipping_method_deleted_at_idx ON shipping_method USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE shipping_method_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT shipping_method_local_shipping_method_base_id_fkey FOREIGN KEY (base_id) REFERENCES shipping_method (id),
  //     CONSTRAINT shipping_method_local_language_base_id_key UNIQUE (language, base_id)
  //   );
  //   CREATE INDEX shipping_method_local_language_idx ON shipping_method_local USING btree (language);
  // ");
  // // -----
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('shipping_method_rate_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE shipping_method_rate (
  //     shipping_method_id INTEGER NOT NULL,
  //     checker JSONB,
  //     calculator JSONB,
  //     status shipping_method_rate_status_enum DEFAULT 'active'::shipping_method_rate_status_enum NOT NULL,
  //     --
  //     CONSTRAINT shipping_method_rate_shipping_method_shipping_method_id_fkey FOREIGN KEY (shipping_method_id) REFERENCES shipping_method (id)
  //   );
  //   CREATE INDEX shipping_method_rate_deleted_at_idx ON shipping_method_rate USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('shipping_method_method').ifExists().execute();
  await db.schema.dropType('shipping_method_method_status_enum').ifExists().execute();
  await db.schema.dropTable('shipping_method').ifExists().execute();
  await db.schema.dropType('shipping_method_status_enum').ifExists().execute();
  await db.schema.dropTable('shipping_market').ifExists().execute();
  await db.schema.dropTable('shipping_local').ifExists().execute();
  await db.schema.dropTable('shipping').ifExists().execute();
  await db.schema.dropType('shipping_status_enum').ifExists().execute();
};
