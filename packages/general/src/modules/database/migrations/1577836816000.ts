import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, 'order_shipping_address').execute();
  //     CREATE TABLE  (
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
  //     CREATE INDEX order_shipping_address_deleted_at_idx ON order_shipping_address USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE order_billing_address (
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
  //     CREATE INDEX order_billing_address_deleted_at_idx ON order_billing_address USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  await db.schema
    .createType('order_status_enum')
    .asEnum(['draft', 'pending', 'completed', 'unresolved', 'canceled', 'archived'])
    .execute();

  //     CREATE TABLE "order" (
  //       number VARCHAR NOT NULL CONSTRAINT order_number_key UNIQUE,
  //       customer_id INTEGER NOT NULL,
  //       identifier VARCHAR NOT NULL,
  //       currency VARCHAR NOT NULL,
  //       region_id INTEGER NOT NULL,
  //       channel_id INTEGER NOT NULL,
  //       shipping_address_id INTEGER,
  //       billing_address_id INTEGER,
  //       canceled_at TIMESTAMP WITHOUT TIME ZONE,
  //       status order_status_enum DEFAULT 'draft'::order_status_enum NOT NULL,
  //       --
  //       CONSTRAINT order_customer_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES "order" (id),
  //       CONSTRAINT order_region_region_id_fkey FOREIGN KEY (region_id) REFERENCES region (id),
  //       CONSTRAINT order_channel_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES channel (id),
  //       CONSTRAINT order_order_shipping_address_shipping_address_id_fkey FOREIGN KEY (shipping_address_id) REFERENCES order_shipping_address (id),
  //       CONSTRAINT order_order_billing_address_billing_address_id_fkey FOREIGN KEY (billing_address_id) REFERENCES order_billing_address (id)
  //     );
  //     CREATE INDEX order_deleted_at_idx ON "order" USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE order_line (
  //       number VARCHAR NOT NULL CONSTRAINT order_line_number_key UNIQUE,
  //       order_id INTEGER NOT NULL,
  //       product_id INTEGER,
  //       product_variant_id INTEGER,
  //       quantity INTEGER DEFAULT 1,
  //       amount VARCHAR,
  //       --
  //       fulfilled_quantity INTEGER DEFAULT 0,
  //       shipped_quantity INTEGER DEFAULT 0,
  //       delivered_quantity INTEGER DEFAULT 0,
  //       return_requested_quantity INTEGER DEFAULT 0,
  //       return_received_quantity INTEGER DEFAULT 0,
  //       return_dismissed_quantity INTEGER DEFAULT 0,
  //       written_off_quantity INTEGER DEFAULT 0,
  //       --
  //       CONSTRAINT order_line_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES "order" (id),
  //       CONSTRAINT order_line_product_variant_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES product_variant (id),
  //       CONSTRAINT order_line_product_product_id_fkey FOREIGN KEY (product_id) REFERENCES product (id)
  //     );
  //     CREATE INDEX order_line_deleted_at_idx ON order_line USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE order_line_addon (
  //       order_line_id INTEGER NOT NULL,
  //       addon_value_id INTEGER,
  //       amount VARCHAR,
  //       --
  //       CONSTRAINT order_line_addon_order_line_order_line_id_fkey FOREIGN KEY (order_line_id) REFERENCES order_line (id),
  //       CONSTRAINT order_line_addon_product_addon_value_addon_value_id_fkey FOREIGN KEY (addon_value_id) REFERENCES product_addon_value (id)
  //     );
  //     CREATE INDEX order_line_addon_deleted_at_idx ON order_line_addon USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE order_shipping (
  //       order_id INTEGER NOT NULL,
  //       reference_key VARCHAR,
  //       reference_value VARCHAR,
  //       shipping_method_id INTEGER,
  //       amount VARCHAR,
  //       --
  //       CONSTRAINT order_shipping_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES "order" (id),
  //       CONSTRAINT order_shipping_shipping_method_shipping_method_id_fkey FOREIGN KEY (shipping_method_id) REFERENCES shipping_method (id)
  //     );
  //     CREATE INDEX order_shipping_deleted_at_idx ON order_shipping USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE order_transaction (
  //       order_id INTEGER NOT NULL,
  //       source_reference_key VARCHAR,
  //       source_reference_value VARCHAR,
  //       target_reference_key VARCHAR,
  //       target_reference_value VARCHAR,
  //       amount VARCHAR,
  //       currency VARCHAR,
  //       --
  //       CONSTRAINT order_transaction_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES "order" (id)
  //     );
  //     CREATE INDEX order_transaction_deleted_at_idx ON order_transaction USING btree (deleted_at)
  //     WHERE
  //       deleted_at IS NOT NULL;
  //   ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //     CREATE TABLE order_cart (
  //       order_id INTEGER NOT NULL,
  //       cart_id INTEGER NOT NULL,
  //       --
  //       created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
  //       --
  //       CONSTRAINT order_cart_order_id_cart_id_pkey PRIMARY KEY (order_id, cart_id),
  //       CONSTRAINT order_cart_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES "order" (id),
  //       CONSTRAINT order_cart_cart_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES "cart" (id)
  //     );
  //     CREATE INDEX order_cart_order_id_idx ON order_cart USING btree (order_id);
  //     CREATE INDEX order_cart_cart_id_idx ON order_cart USING btree (cart_id);
  //   ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('order_cart').ifExists().execute();
  await db.schema.dropTable('order_transaction').ifExists().execute();
  await db.schema.dropTable('order_shipping').ifExists().execute();
  await db.schema.dropTable('order_line_addon').ifExists().execute();
  await db.schema.dropTable('order_line').ifExists().execute();
  await db.schema.dropTable('order').ifExists().execute();
  await db.schema.dropType('order_status_enum').ifExists().execute();
  await db.schema.dropTable('order_shipping_address').ifExists().execute();
  await db.schema.dropTable('order_billing_address').ifExists().execute();
};
