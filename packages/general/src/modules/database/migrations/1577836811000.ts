import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  //   // PRODUCT_FACET_KEY
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_facet_key (
  //       slug VARCHAR NOT NULL CONSTRAINT product_facet_key_slug_key UNIQUE,
  //       "order" INTEGER,
  //       thumbnail_id INTEGER,
  //       parent_id INTEGER,
  //       presentable BOOLEAN DEFAULT TRUE NOT NULL,
  //       filterable BOOLEAN DEFAULT TRUE NOT NULL,
  //       comparable BOOLEAN DEFAULT TRUE NOT NULL,
  //       --
  //       CONSTRAINT product_facet_key_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id),
  //       CONSTRAINT product_facet_key_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES product_facet_key (id),
  //       CONSTRAINT product_facet_key_parent_id_check CHECK (
  //         parent_id IS NULL
  //         OR (
  //           parent_id <> id
  //           AND parent_id IS NOT NULL
  //         )
  //       )
  //     );
  //     CREATE INDEX product_facet_key_parent_id_idx ON product_facet_key USING btree (parent_id)
  //     WHERE
  //       parent_id IS NOT NULL;
  //     CREATE INDEX product_facet_key_deleted_at_idx ON product_facet_key USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  //   // PRODUCT_FACET_KEY_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_facet_key_local (
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_facet_key_local_product_facet_key_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_facet_key (id),
  //       CONSTRAINT product_facet_key_local_language_base_id_key UNIQUE (language, base_id)
  //     );
  //     CREATE INDEX product_facet_key_local_language_idx ON product_facet_key_local USING btree (language);
  //   ");
  //   // PRODUCT_FACET_VALUE
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_facet_value (
  //       slug VARCHAR NOT NULL CONSTRAINT product_facet_value_slug_key UNIQUE,
  //       product_facet_key_id INTEGER NOT NULL,
  //       "order" INTEGER,
  //       thumbnail_id INTEGER,
  //       --
  //       CONSTRAINT product_facet_value_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id),
  //       CONSTRAINT product_facet_value_product_facet_key_product_facet_key_id_fkey FOREIGN KEY (product_facet_key_id) REFERENCES product_facet_key (id)
  //     );
  //     CREATE INDEX product_facet_value_deleted_at_idx ON product_facet_value USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  //   // PRODUCT_FACET_VALUE_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_facet_value_local (
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_facet_value_local_product_facet_value_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_facet_value (id),
  //       CONSTRAINT product_facet_value_local_language_base_id_key UNIQUE (language, base_id)
  //     );
  //     CREATE INDEX product_facet_value_local_language_idx ON product_facet_value_local USING btree (language);
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_facet (
  //       product_id INTEGER NOT NULL,
  //       product_variant_id INTEGER,
  //       product_facet_value_id INTEGER NOT NULL,
  //       "order" INTEGER,
  //       --
  //       --CONSTRAINT product_facet_product_variant_id_check CHECK (
  //       --  (product_variant_id IS NULL)
  //       --  OR (
  //       --    product_variant_id IS NOT NULL
  //       --    AND product_id = (
  //       --      SELECT
  //       --        product_id
  //       --      FROM
  //       --        product_variant
  //       --      WHERE
  //       --        id = product_variant_id
  //       --    )
  //       --  )
  //       --),
  //       CONSTRAINT product_facet_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  //       CONSTRAINT product_facet_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id) ON DELETE CASCADE,
  //       CONSTRAINT product_facet_product_facet_value_product_facet_value_id_fkey FOREIGN KEY (product_facet_value_id) REFERENCES product_facet_value (id) ON DELETE CASCADE,
  //       CONSTRAINT product_facet_product_id_product_variant_id_product_facet_value_id_key UNIQUE NULLS NOT DISTINCT (
  //         product_id,
  //         product_variant_id,
  //         product_facet_value_id
  //       )
  //     );
  //     CREATE INDEX product_facet_product_id ON product_facet (product_id);
  //     CREATE INDEX product_facet_product_facet_value_id ON product_facet (product_facet_value_id);
  //     CREATE INDEX product_facet_product_variant_id ON product_facet (product_variant_id)
  //     WHERE
  //       product_variant_id IS NOT NULL;
  //     CREATE INDEX product_facet_deleted_at_idx ON product_facet USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  //   //   --------
  //   // PRODUCT_ADDON_KEY
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  await db.schema
    .createType('product_addon_key_type_enum')
    .asEnum(['single', 'multiple'])
    .execute();

  //     CREATE TABLE product_addon_key (
  //       slug VARCHAR NOT NULL CONSTRAINT product_addon_key_slug_key UNIQUE,
  //       "order" INTEGER,
  //       thumbnail_id INTEGER,
  //       type product_addon_key_type_enum DEFAULT 'single'::product_addon_key_type_enum NOT NULL,
  //       --
  //       CONSTRAINT product_addon_key_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id)
  //     );
  //     CREATE INDEX product_addon_key_deleted_at_idx ON product_addon_key USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  //   // PRODUCT_ADDON_KEY_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_addon_key_local (
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_addon_key_local_product_addon_key_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_addon_key (id),
  //       CONSTRAINT product_addon_key_local_language_base_id_key UNIQUE (language, base_id)
  //     );
  //     CREATE INDEX product_addon_key_local_language_idx ON product_addon_key_local USING btree (language);
  //   ");
  //   // PRODUCT_ADDON_VALUE
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_addon_value (
  //       slug VARCHAR NOT NULL CONSTRAINT product_addon_value_slug_key UNIQUE,
  //       product_addon_key_id INTEGER NOT NULL,
  //       "order" INTEGER,
  //       thumbnail_id INTEGER,
  //       price_id INTEGER,
  //       --
  //       CONSTRAINT product_addon_value_price_price_id_fkey FOREIGN KEY (price_id) REFERENCES price (id),
  //       CONSTRAINT product_addon_value_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id),
  //       CONSTRAINT product_addon_value_product_addon_key_product_addon_key_id_fkey FOREIGN KEY (product_addon_key_id) REFERENCES product_addon_key (id)
  //     );
  //     CREATE INDEX product_addon_value_deleted_at_idx ON product_addon_value USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  //   // PRODUCT_ADDON_VALUE_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE product_addon_value_local (
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_addon_value_local_product_addon_value_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_addon_value (id),
  //       CONSTRAINT product_addon_value_local_language_base_id_key UNIQUE (language, base_id)
  //     );
  //     CREATE INDEX product_addon_value_local_language_idx ON product_addon_value_local USING btree (language);
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  await db.schema.createType('product_addon_type_enum').asEnum(['optional', 'required']).execute();

  //     CREATE TABLE product_addon (
  //       product_market_id INTEGER NOT NULL,
  //       product_addon_value_id INTEGER NOT NULL,
  //       "order" INTEGER,
  //       type product_addon_type_enum DEFAULT 'optional'::product_addon_type_enum NOT NULL,
  //       --
  //       CONSTRAINT product_addon_product_market_product_market_id_fkey FOREIGN KEY (product_market_id) REFERENCES product_market (id) ON DELETE CASCADE,
  //       CONSTRAINT product_addon_product_addon_value_product_addon_value_id_fkey FOREIGN KEY (product_addon_value_id) REFERENCES product_addon_value (id) ON DELETE CASCADE,
  //       CONSTRAINT product_addon_product_market_id_product_addon_value_id_key UNIQUE (product_market_id, product_addon_value_id)
  //     );
  //     CREATE INDEX product_addon_product_addon_value_id ON product_addon (product_addon_value_id);
  //     CREATE INDEX product_addon_product_market_id ON product_addon (product_market_id);
  //     CREATE INDEX product_addon_deleted_at_idx ON product_addon USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('product_addon').ifExists().execute();
  await db.schema.dropType('product_addon_type_enum').ifExists().execute();
  await db.schema.dropTable('product_addon_value_local').ifExists().execute();
  await db.schema.dropTable('product_addon_value').ifExists().execute();
  await db.schema.dropTable('product_addon_key_local').ifExists().execute();
  await db.schema.dropTable('product_addon_key').ifExists().execute();
  await db.schema.dropType('product_addon_key_type_enum').ifExists().execute();
  await db.schema.dropTable('product_facet').ifExists().execute();
  await db.schema.dropTable('product_facet_value_local').ifExists().execute();
  await db.schema.dropTable('product_facet_value').ifExists().execute();
  await db.schema.dropTable('product_facet_key_local').ifExists().execute();
  await db.schema.dropTable('product_facet_key').ifExists().execute();
};
