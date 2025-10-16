import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createType('product_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await factory(db, 'product')
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('priority', sql`decimal(2, 1)`, (cb) =>
      cb
        .notNull()
        .defaultTo(0.5)
        .check(sql`
          priority >= 0.0
          AND priority <= 1.0
        `),
    )
    .addColumn('status', sql`product_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::product_status_enum"`),
    )
    .execute();

  // // PRODUCT_MEDIA
  await factory(db, 'product_media')
    .addColumn('order', 'integer', (cb) => cb)
    .addColumn('product_id', 'bigint', (cb) => cb.notNull().references('product.id'))
    .addColumn('asset_id', 'bigint', (cb) => cb.notNull().references('asset.id'))
    .addUniqueConstraint(
      'product_media_product_id_asset_id_key',
      ['product_id', 'asset_id'],
      (cb) => cb,
    )
    .execute();

  // // PRODUCT_INTERACTION
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('product_interaction_key_enum')
    .asEnum(['like', 'dislike', 'bookmark', 'report'])
    .execute();

  //   CREATE TABLE product_interaction (
  //     product_id INTEGER NOT NULL,
  //     customer_id INTEGER NOT NULL,
  //     key product_interaction_key_enum NOT NULL,
  //     value JSONB,
  //     --
  //     CONSTRAINT product_interaction_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE SET NULL,
  //     CONSTRAINT product_interaction_customer_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE SET NULL
  //   );
  //   CREATE INDEX product_interaction_deleted_at_idx ON product_interaction USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_COMMENT
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('product_comment_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await db.schema
    .createType('product_comment_user_type_enum')
    .asEnum(['customer', 'operator'])
    .execute();

  //   CREATE TABLE product_comment (
  //     content TEXT NOT NULL,
  //     user_type product_comment_user_type_enum NOT NULL,
  //     parent_id INTEGER,
  //     user_id INTEGER NOT NULL,
  //     product_id INTEGER NOT NULL,
  //     status product_comment_status_enum DEFAULT 'inactive'::product_comment_status_enum NOT NULL,
  //     positives INT DEFAULT 0 NOT NULL,
  //     negatives INT DEFAULT 0 NOT NULL,
  //     reports INT DEFAULT 0 NOT NULL,
  //     --
  //     CONSTRAINT product_comment_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES product_comment (id),
  //     CONSTRAINT product_comment_parent_id_check CHECK (
  //       parent_id IS NULL
  //       OR (
  //         parent_id <> id
  //         AND parent_id IS NOT NULL
  //       )
  //     ),
  //     CONSTRAINT product_comment_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id)
  //   );
  //   CREATE INDEX product_comment_user_type_idx ON product_comment USING btree (user_type);
  //   CREATE INDEX product_comment_status_idx ON product_comment USING btree (status);
  //   CREATE INDEX product_comment_parent_id_idx ON product_comment USING btree (parent_id)
  //   WHERE
  //     parent_id IS NOT NULL;
  //   CREATE INDEX product_comment_deleted_at_idx ON product_comment USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_COMMENT_INTERACTION
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('product_comment_interaction_key_enum')
    .asEnum(['rate', 'like', 'dislike', 'advantage', 'disadvantage', 'report'])
    .execute();

  //   CREATE TABLE product_comment_interaction (
  //     product_comment_id INTEGER NOT NULL,
  //     customer_id INTEGER NOT NULL,
  //     key product_comment_interaction_key_enum NOT NULL,
  //     value JSONB,
  //     --
  //     CONSTRAINT product_comment_interaction_product_comment_product_comment_id_fkey FOREIGN KEY (product_comment_id) REFERENCES product_comment (id) ON DELETE SET NULL,
  //     CONSTRAINT product_comment_interaction_customer_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customer (id) ON DELETE SET NULL
  //   );
  //   CREATE INDEX product_comment_interaction_deleted_at_idx ON product_comment_interaction USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     seo_id INTEGER,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT product_local_product_base_id_fkey FOREIGN KEY (base_id) REFERENCES product (id),
  //     CONSTRAINT product_local_language_base_id_key UNIQUE (language, base_id),
  //     CONSTRAINT product_local_seo_seo_id_fkey FOREIGN KEY (seo_id) REFERENCES seo (id) ON DELETE SET NULL
  //   );
  //   CREATE INDEX product_local_language_idx ON product_local USING btree (language);
  // ");
  // // PRODUCT_VARIANT
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('product_variant_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE product_variant (
  //     slug VARCHAR NOT NULL CONSTRAINT product_variant_slug_key UNIQUE,
  //     sku VARCHAR NOT NULL CONSTRAINT product_variant_sku_key UNIQUE,
  //     barcode VARCHAR,
  //     "order" INTEGER,
  //     product_id INTEGER NOT NULL,
  //     weight DECIMAL(11, 2),
  //     weight_unit weight_unit_enum,
  //     length DECIMAL(11, 2),
  //     length_unit dimension_unit_enum,
  //     height DECIMAL(11, 2),
  //     height_unit dimension_unit_enum,
  //     width DECIMAL(11, 2),
  //     width_unit dimension_unit_enum,
  //     material VARCHAR,
  //     country VARCHAR,
  //     status product_variant_status_enum DEFAULT 'inactive'::product_variant_status_enum NOT NULL,
  //     --
  //     CONSTRAINT product_variant_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE
  //   );
  //   CREATE INDEX product_variant_status_idx ON product_variant USING btree (status);
  //   CREATE INDEX product_variant_deleted_at_idx ON product_variant USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_VARIANT_MEDIA
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_variant_media (
  //     "order" INTEGER,
  //     product_variant_id INTEGER NOT NULL,
  //     asset_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT product_variant_media_product_variant_id_asset_id_pkey UNIQUE (product_variant_id, asset_id),
  //     CONSTRAINT product_variant_media_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id) ON DELETE CASCADE,
  //     CONSTRAINT product_variant_media_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES asset (id) ON DELETE CASCADE
  //   );
  // ");
  // // PRODUCT_VARIANT_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_variant_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     seo_id INTEGER,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT product_variant_local_product_variant_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_variant (id),
  //     CONSTRAINT product_variant_local_language_base_id_key UNIQUE (language, base_id),
  //     CONSTRAINT product_variant_local_seo_seo_id_fkey FOREIGN KEY (seo_id) REFERENCES seo (id) ON DELETE SET NULL
  //   );
  //   CREATE INDEX product_variant_local_language_idx ON product_variant_local USING btree (language);
  // ");
  // // PRODUCT_CATEGORY
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('product_category_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE product_category (
  //     slug VARCHAR NOT NULL CONSTRAINT product_category_slug_key UNIQUE,
  //     thumbnail_id INTEGER,
  //     "order" INTEGER,
  //     parent_id INTEGER,
  //     status product_category_status_enum DEFAULT 'inactive'::product_category_status_enum NOT NULL,
  //     presentable BOOLEAN DEFAULT TRUE NOT NULL,
  //     --
  //     CONSTRAINT product_category_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id),
  //     CONSTRAINT product_category_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES product_category (id),
  //     CONSTRAINT product_category_parent_id_check CHECK (
  //       parent_id IS NULL
  //       OR (
  //         parent_id <> id
  //         AND parent_id IS NOT NULL
  //       )
  //     )
  //   );
  //   CREATE INDEX product_category_status_idx ON product_category USING btree (status);
  //   CREATE INDEX product_category_parent_id_idx ON product_category USING btree (parent_id)
  //   WHERE
  //     parent_id IS NOT NULL;
  //   CREATE INDEX product_category_deleted_at_idx ON product_category USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_CATEGORY_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_category_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     seo_id INTEGER,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT product_category_local_product_category_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_category (id),
  //     CONSTRAINT product_category_local_language_base_id_key UNIQUE (language, base_id),
  //     CONSTRAINT product_category_local_seo_seo_id_fkey FOREIGN KEY (seo_id) REFERENCES seo (id) ON DELETE SET NULL
  //   );
  //   CREATE INDEX product_category_local_language_idx ON product_category_local USING btree (language);
  // ");
  // // PRODUCT_PRODUCT_CATEGORY
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_product_category (
  //     product_id INTEGER NOT NULL,
  //     product_category_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT product_product_category_product_id_product_category_id_pkey PRIMARY KEY (product_id, product_category_id),
  //     CONSTRAINT product_product_category_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  //     CONSTRAINT product_product_category_product_category_product_category_id_fkey FOREIGN KEY (product_category_id) REFERENCES product_category (id) ON DELETE CASCADE
  //   );
  // ");
  // // PRODUCT_TAG
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('product_tag_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE product_tag (
  //     slug VARCHAR NOT NULL CONSTRAINT product_tag_slug_key UNIQUE,
  //     thumbnail_id INTEGER,
  //     presentable BOOLEAN DEFAULT TRUE NOT NULL,
  //     status product_tag_status_enum DEFAULT 'inactive'::product_tag_status_enum NOT NULL,
  //     --
  //     CONSTRAINT product_tag_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id)
  //   );
  //   CREATE INDEX product_tag_status_idx ON product_tag USING btree (status);
  //   CREATE INDEX product_tag_deleted_at_idx ON product_tag USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_TAG_LOCAL
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_tag_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     seo_id INTEGER,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT product_tag_local_product_tag_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_tag (id),
  //     CONSTRAINT product_tag_local_language_base_id_key UNIQUE (language, base_id),
  //     CONSTRAINT product_tag_local_seo_seo_id_fkey FOREIGN KEY (seo_id) REFERENCES seo (id) ON DELETE SET NULL
  //   );
  //   CREATE INDEX product_tag_local_language_idx ON product_tag_local USING btree (language);
  // ");
  // // PRODUCT_PRODUCT_TAG
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_product_tag (
  //     product_id INTEGER NOT NULL,
  //     product_tag_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT product_product_tag_product_id_product_tag_id_pkey PRIMARY KEY (product_id, product_tag_id),
  //     CONSTRAINT product_product_tag_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  //     CONSTRAINT product_product_tag_product_tag_product_tag_id_fkey FOREIGN KEY (product_tag_id) REFERENCES product_tag (id) ON DELETE CASCADE
  //   );
  // ");
  // // PRODUCT_MARKET
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE product_market (
  //     product_id INTEGER NOT NULL,
  //     product_variant_id INTEGER NOT NULL,
  //     market_id INTEGER NOT NULL,
  //     --
  //     presentable BOOLEAN DEFAULT TRUE NOT NULL,
  //     taxable BOOLEAN DEFAULT TRUE NOT NULL,
  //     refundable BOOLEAN DEFAULT TRUE NOT NULL,
  //     promotionable BOOLEAN DEFAULT TRUE NOT NULL,
  //     purchasable BOOLEAN DEFAULT TRUE NOT NULL,
  //     commentable BOOLEAN DEFAULT TRUE NOT NULL,
  //     compliance JSONB,
  //     --
  //     CONSTRAINT product_market_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE,
  //     CONSTRAINT product_market_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id) ON DELETE CASCADE,
  //     CONSTRAINT product_market_market_market_id_fkey FOREIGN KEY (market_id) REFERENCES market (id) ON DELETE CASCADE,
  //     CONSTRAINT product_market_product_id_product_variant_id_market_id_key UNIQUE (product_id, product_variant_id, market_id)
  //   );
  //   CREATE INDEX product_market_deleted_at_idx ON product_market USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // PRODUCT_MARKET
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE price_product_market (
  //     price_id INTEGER NOT NULL,
  //     product_market_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT price_product_market_price_id_product_market_id_pkey PRIMARY KEY (price_id, product_market_id),
  //     CONSTRAINT price_product_market_price_price_id_fkey FOREIGN KEY (price_id) REFERENCES price (id) ON DELETE CASCADE,
  //     CONSTRAINT price_product_market_product_market_product_market_id_fkey FOREIGN KEY (product_market_id) REFERENCES product_market (id) ON DELETE CASCADE
  //   );
  // ");
  //   --------------------
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //     CREATE TABLE product_option_key (
  //       slug VARCHAR NOT NULL,
  //       thumbnail_id INTEGER,
  //       "order" INTEGER,
  //       product_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_option_key_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id),
  //       CONSTRAINT product_option_key_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id)
  //     );
  //     CREATE INDEX product_option_key_deleted_at_idx ON product_option_key USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //     CREATE TABLE product_option_key_local (
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_option_key_local_product_option_key_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_option_key (id),
  //       CONSTRAINT product_option_key_local_language_base_id_key UNIQUE (language, base_id)
  //     );
  //     CREATE INDEX product_option_key_local_language_idx ON product_option_key_local USING btree (language);
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //     CREATE TABLE product_option_value (
  //       slug VARCHAR NOT NULL,
  //       thumbnail_id INTEGER,
  //       "order" INTEGER,
  //       product_option_key_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_option_value_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id),
  //       CONSTRAINT product_option_value_product_option_key_product_option_key_id_fkey FOREIGN KEY (product_option_key_id) REFERENCES product_option_key (id)
  //     );
  //     CREATE INDEX product_option_value_deleted_at_idx ON product_option_value USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //     CREATE TABLE product_option_value_local (
  //       name VARCHAR NOT NULL,
  //       summary TEXT,
  //       description TEXT,
  //       language VARCHAR,
  //       base_id INTEGER NOT NULL,
  //       --
  //       CONSTRAINT product_option_value_local_product_option_value_base_id_fkey FOREIGN KEY (base_id) REFERENCES product_option_value (id),
  //       CONSTRAINT product_option_value_local_language_base_id_key UNIQUE (language, base_id)
  //     );
  //     CREATE INDEX product_option_value_local_language_idx ON product_option_value_local USING btree (language);
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //     CREATE TABLE product_option_value_product_variant (
  //       product_option_value_id INTEGER NOT NULL,
  //       product_variant_id INTEGER NOT NULL,
  //       --
  //       created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //       --
  //       CONSTRAINT product_option_value_product_variant_product_option_value_id_product_variant_id_pkey PRIMARY KEY (product_option_value_id, product_variant_id),
  //       CONSTRAINT product_option_value_product_variant_product_option_value_product_option_value_id_fkey FOREIGN KEY (product_option_value_id) REFERENCES product_option_value (id) ON DELETE CASCADE,
  //       CONSTRAINT product_option_value_product_variant_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id) ON DELETE CASCADE
  //     );
  //   ");
  // ---------
  //  await factory(db,"").execute()

  //     CREATE TABLE product_collection (
  //       name VARCHAR,
  //       slug VARCHAR NOT NULL CONSTRAINT product_collection_slug_key UNIQUE,
  //       description VARCHAR
  //     );
  //     CREATE INDEX product_collection_deleted_at_idx ON product_collection USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //     CREATE TABLE product_variant_product_collection (
  //       product_variant_id INTEGER NOT NULL,
  //       product_collection_id INTEGER NOT NULL,
  //       --
  //       created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //       --
  //       CONSTRAINT product_variant_product_collection_product_variant_id_product_collection_id_pkey PRIMARY KEY (product_variant_id, product_collection_id),
  //       CONSTRAINT product_variant_product_collection_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id) ON DELETE CASCADE,
  //       CONSTRAINT product_variant_product_collection_product_collection_product_collection_id_fkey FOREIGN KEY (product_collection_id) REFERENCES product_collection (id) ON DELETE CASCADE
  //     );
  //     CREATE INDEX product_variant_product_collection_product_variant_id_idx ON product_variant_product_collection USING btree (product_variant_id);
  //     CREATE INDEX product_variant_product_collection_product_collection_id_idx ON product_variant_product_collection USING btree (product_collection_id);
  //   ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('product_variant_product_collection').ifExists().execute();
  await db.schema.dropTable('product_collection').ifExists().execute();
  await db.schema.dropTable('product_option_value_product_variant').ifExists().execute();
  await db.schema.dropTable('product_option_value_local').ifExists().execute();
  await db.schema.dropTable('product_option_value;').ifExists().execute();
  await db.schema.dropTable('product_option_key_local;').ifExists().execute();
  await db.schema.dropTable('product_option_key;').ifExists().execute();
  await db.schema.dropTable('price_product_market').ifExists().execute();
  await db.schema.dropTable('product_market').ifExists().execute();
  await db.schema.dropTable('product_variant_local').ifExists().execute();
  await db.schema.dropTable('product_variant_media').ifExists().execute();
  await db.schema.dropTable('product_variant').ifExists().execute();
  await db.schema.dropType('product_variant_status_enum').ifExists().execute();
  await db.schema.dropTable('product_product_tag').ifExists().execute();
  await db.schema.dropTable('product_tag_local').ifExists().execute();
  await db.schema.dropTable('product_tag').ifExists().execute();
  await db.schema.dropType('product_tag_status_enum').ifExists().execute();
  await db.schema.dropTable('product_product_category').ifExists().execute();
  await db.schema.dropTable('product_category_local').ifExists().execute();
  await db.schema.dropTable('product_category').ifExists().execute();
  await db.schema.dropType('product_category_status_enum').ifExists().execute();
  await db.schema.dropTable('product_local').ifExists().execute();
  await db.schema.dropTable('product_comment_interaction').ifExists().execute();
  await db.schema.dropType('product_comment_interaction_key_enum').ifExists().execute();
  await db.schema.dropTable('product_comment').ifExists().execute();
  await db.schema.dropType('product_comment_status_enum').ifExists().execute();
  await db.schema.dropType('product_comment_user_type_enum').ifExists().execute();
  await db.schema.dropTable('product_interaction').ifExists().execute();
  await db.schema.dropType('product_interaction_key_enum').ifExists().execute();
  await db.schema.dropTable('product_local').ifExists().execute();
  await db.schema.dropTable('product_media').ifExists().execute();
  await db.schema.dropTable('product').ifExists().execute();
  await db.schema.dropType('product_status_enum').ifExists().execute();
};
