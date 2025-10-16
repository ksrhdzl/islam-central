import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('financial_method_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE financial_method (
  //     slug VARCHAR NOT NULL CONSTRAINT financial_method_slug_key UNIQUE,
  //     currencies VARCHAR[] DEFAULT '{}'::VARCHAR[] NOT NULL,
  //     "order" INTEGER,
  //     thumbnail_id INTEGER,
  //     settings JSONB,
  //     status financial_method_status_enum DEFAULT 'inactive'::financial_method_status_enum NOT NULL,
  //     --
  //     CONSTRAINT financial_method_asset_thumbnail_id_fkey FOREIGN KEY (thumbnail_id) REFERENCES asset (id)
  //   );
  //   CREATE INDEX financial_method_deleted_at_idx ON financial_method USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE financial_method_local (
  //     name VARCHAR NOT NULL,
  //     summary TEXT,
  //     description TEXT,
  //     language VARCHAR,
  //     base_id INTEGER NOT NULL,
  //     --
  //     CONSTRAINT financial_method_local_financial_method_base_id_fkey FOREIGN KEY (base_id) REFERENCES financial_method (id),
  //     CONSTRAINT financial_method_local_language_base_id_key UNIQUE (language, base_id)
  //   );
  //   CREATE INDEX financial_method_local_language_idx ON financial_method_local USING btree (language);
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE financial_method_market (
  //     financial_method_id INTEGER NOT NULL,
  //     market_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT financial_method_market_financial_method_id_market_id_pkey PRIMARY KEY (financial_method_id, market_id),
  //     CONSTRAINT financial_method_market_financial_method_financial_method_id_fkey FOREIGN KEY (financial_method_id) REFERENCES financial_method (id) ON DELETE CASCADE,
  //     CONSTRAINT financial_method_market_market_market_id_fkey FOREIGN KEY (market_id) REFERENCES market (id) ON DELETE CASCADE
  //   );
  //   CREATE INDEX financial_method_market_financial_method_id_idx ON financial_method_market USING btree (financial_method_id);
  //   CREATE INDEX financial_method_market_market_id_idx ON financial_method_market USING btree (market_id);
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('financial_collection_status_enum')
    .asEnum([
      'awaiting',
      'pending',
      'authorized',
      'partially_authorized',
      'captured',
      'partially_captured',
      'refunded',
      'partially_refunded',
      'failed',
      'canceled',
    ])
    .execute();

  //   CREATE TABLE financial_collection (
  //     identifier VARCHAR,
  //     amount VARCHAR,
  //     currency VARCHAR,
  //     authorized_amount VARCHAR,
  //     captured_amount VARCHAR,
  //     refunded_amount VARCHAR,
  //     completed_at TIMESTAMP WITHOUT TIME ZONE,
  //     status financial_collection_status_enum DEFAULT 'pending'::financial_collection_status_enum NOT NULL
  //     --
  //   );
  //   CREATE INDEX financial_collection_deleted_at_idx ON financial_collection USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE financial_transaction (
  //     collection_id INTEGER NOT NULL,
  //     amount VARCHAR NOT NULL,
  //     currency VARCHAR NOT NULL,
  //     method VARCHAR NOT NULL,
  //     description VARCHAR,
  //     transaction VARCHAR,
  //     authorized_at TIMESTAMP WITHOUT TIME ZONE,
  //     captured_at TIMESTAMP WITHOUT TIME ZONE,
  //     refunded_at TIMESTAMP WITHOUT TIME ZONE,
  //     canceled_at TIMESTAMP WITHOUT TIME ZONE,
  //     --
  //     CONSTRAINT financial_transaction_financial_collection_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES financial_collection (id)
  //   );
  //   CREATE INDEX financial_transaction_deleted_at_idx ON financial_transaction USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE cart_financial_collection (
  //     cart_id INTEGER NOT NULL,
  //     financial_collection_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT cart_financial_collection_cart_id_financial_collection_id_pkey PRIMARY KEY (cart_id, financial_collection_id),
  //     CONSTRAINT cart_financial_collection_financial_collection_financial_collection_id_fkey FOREIGN KEY (financial_collection_id) REFERENCES financial_collection (id),
  //     CONSTRAINT cart_financial_collection_cart_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES cart (id)
  //   );
  //   CREATE INDEX cart_financial_collection_financial_collection_id_idx ON cart_financial_collection USING btree (financial_collection_id);
  //   CREATE INDEX cart_financial_collection_cart_id_idx ON cart_financial_collection USING btree (cart_id);
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE order_financial_collection (
  //     order_id INTEGER NOT NULL,
  //     financial_collection_id INTEGER NOT NULL,
  //     --
  //     created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //     --
  //     CONSTRAINT order_financial_collection_order_id_financial_collection_id_pkey PRIMARY KEY (order_id, financial_collection_id),
  //     CONSTRAINT order_financial_collection_financial_collection_financial_collection_id_fkey FOREIGN KEY (financial_collection_id) REFERENCES financial_collection (id),
  //     CONSTRAINT order_financial_collection_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES "order" (id)
  //   );
  //   CREATE INDEX order_financial_collection_financial_collection_id_idx ON order_financial_collection USING btree (financial_collection_id);
  //   CREATE INDEX order_financial_collection_order_id_idx ON order_financial_collection USING btree (order_id);
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE financial_authorize (
  //     transaction_id INTEGER NOT NULL,
  //     amount VARCHAR NOT NULL,
  //     currency VARCHAR NOT NULL,
  //     created_by VARCHAR,
  //     --
  //     CONSTRAINT financial_authorize_financial_transaction_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES financial_transaction (id)
  //   );
  //   CREATE INDEX financial_authorize_deleted_at_idx ON financial_authorize USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE financial_capture (
  //     transaction_id INTEGER NOT NULL,
  //     amount VARCHAR NOT NULL,
  //     currency VARCHAR NOT NULL,
  //     created_by VARCHAR,
  //     --
  //     CONSTRAINT financial_capture_financial_transaction_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES financial_transaction (id)
  //   );
  //   CREATE INDEX financial_capture_deleted_at_idx ON financial_capture USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE financial_refund (
  //     transaction_id INTEGER NOT NULL,
  //     amount VARCHAR NOT NULL,
  //     currency VARCHAR NOT NULL,
  //     created_by VARCHAR,
  //     --
  //     CONSTRAINT financial_refund_financial_transaction_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES financial_transaction (id)
  //   );
  //   CREATE INDEX financial_refund_deleted_at_idx ON financial_refund USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('cart_financial_collection').ifExists().execute();
  await db.schema.dropTable('order_financial_collection').ifExists().execute();
  await db.schema.dropTable('financial_refund').ifExists().execute();
  await db.schema.dropTable('financial_capture').ifExists().execute();
  await db.schema.dropTable('financial_authorize').ifExists().execute();
  await db.schema.dropTable('financial_transaction').ifExists().execute();
  await db.schema.dropType('financial_transaction_type_enum').ifExists().execute();
  await db.schema.dropType('financial_transaction_status_enum').ifExists().execute();
  await db.schema.dropTable('financial_collection').ifExists().execute();
  await db.schema.dropTable('financial_method_market').ifExists().execute();
  await db.schema.dropTable('financial_method_local').ifExists().execute();
  await db.schema.dropTable('financial_method').ifExists().execute();
  await db.schema.dropType('financial_method_status_enum').ifExists().execute();
};
