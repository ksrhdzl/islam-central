import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE cart_shipping_address (
  //       identifier VARCHAR NOT NULL,
  //       address VARCHAR NOT NULL,
  //       zip VARCHAR,
  //       first_name VARCHAR,
  //       last_name VARCHAR,
  //       phone VARCHAR,
  //       country VARCHAR,
  //       province VARCHAR,
  //       city VARCHAR,
  //       location DECIMAL(9, 6) [] NULL
  //     );
  //     CREATE INDEX cart_shipping_address_deleted_at_idx ON cart_shipping_address USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE cart_billing_address (
  //       identifier VARCHAR NOT NULL,
  //       address VARCHAR NOT NULL,
  //       zip VARCHAR,
  //       first_name VARCHAR,
  //       last_name VARCHAR,
  //       phone VARCHAR,
  //       country VARCHAR,
  //       province VARCHAR,
  //       city VARCHAR,
  //       location DECIMAL(9, 6) [] NULL
  //     );
  //     CREATE INDEX cart_billing_address_deleted_at_idx ON cart_billing_address USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  await db.schema
    .createType('cart_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //     CREATE TABLE cart (
  //       customer_id INTEGER NOT NULL,
  //       identifier VARCHAR NOT NULL,
  //       currency VARCHAR NOT NULL,
  //       region_id INTEGER NOT NULL,
  //       channel_id INTEGER NOT NULL,
  //       shipping_address_id INTEGER,
  //       billing_address_id INTEGER,
  //       completed_at TIMESTAMP WITHOUT TIME ZONE,
  //       status cart_status_enum DEFAULT 'active'::cart_status_enum NOT NULL,
  //       --
  //       CONSTRAINT cart_customer_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES customer (id),
  //       CONSTRAINT cart_region_region_id_fkey FOREIGN KEY (region_id) REFERENCES region (id),
  //       CONSTRAINT cart_channel_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES channel (id),
  //       CONSTRAINT cart_cart_shipping_address_shipping_address_id_fkey FOREIGN KEY (shipping_address_id) REFERENCES cart_shipping_address (id),
  //       CONSTRAINT cart_cart_billing_address_billing_address_id_fkey FOREIGN KEY (billing_address_id) REFERENCES cart_billing_address (id)
  //     );
  //     CREATE INDEX cart_deleted_at_idx ON cart USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE cart_line (
  //       cart_id INTEGER NOT NULL,
  //       product_id INTEGER,
  //       product_variant_id INTEGER,
  //       quantity INTEGER DEFAULT 1,
  //       amount VARCHAR,
  //       --
  //       CONSTRAINT cart_line_cart_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES cart (id),
  //       CONSTRAINT cart_line_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id),
  //       CONSTRAINT cart_line_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id)
  //     );
  //     CREATE INDEX cart_line_deleted_at_idx ON cart_line USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE cart_line_addon (
  //       cart_line_id INTEGER NOT NULL,
  //       addon_value_id INTEGER,
  //       amount VARCHAR,
  //       --
  //       CONSTRAINT cart_line_addon_cart_line_cart_line_id_fkey FOREIGN KEY (cart_line_id) REFERENCES cart_line (id),
  //       CONSTRAINT cart_line_addon_product_addon_value_addon_value_id_fkey FOREIGN KEY (addon_value_id) REFERENCES product_addon_value (id)
  //     );
  //     CREATE INDEX cart_line_addon_deleted_at_idx ON cart_line_addon USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE cart_shipping (
  //       cart_id INTEGER NOT NULL,
  //       shipping_method_id INTEGER,
  //       amount VARCHAR,
  //       --
  //       CONSTRAINT cart_shipping_cart_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES cart (id),
  //       CONSTRAINT cart_shipping_shipping_method_shipping_method_id_fkey FOREIGN KEY (shipping_method_id) REFERENCES shipping_method (id)
  //     );
  //     CREATE INDEX cart_shipping_deleted_at_idx ON cart_shipping USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('cart_shipping').ifExists().execute();
  await db.schema.dropTable('cart_line_addon').ifExists().execute();
  await db.schema.dropTable('cart_line').ifExists().execute();
  await db.schema.dropTable('cart').ifExists().execute();
  await db.schema.dropType('cart_status_enum').ifExists().execute();
  await db.schema.dropTable('cart_shipping_address').ifExists().execute();
  await db.schema.dropTable('cart_billing_address').ifExists().execute();
};
