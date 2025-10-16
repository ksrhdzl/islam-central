import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, 'fulfillment')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();
  //   CREATE TABLE  (
  //     number VARCHAR,
  //     order_id INTEGER NOT NULL,
  //     weight DECIMAL(11, 2),
  //     weight_unit weight_unit_enum,
  //     length DECIMAL(11, 2),
  //     length_unit dimension_unit_enum,
  //     height DECIMAL(11, 2),
  //     height_unit dimension_unit_enum,
  //     width DECIMAL(11, 2),
  //     width_unit dimension_unit_enum,
  //     --
  //     fulfilled_at TIMESTAMP WITHOUT TIME ZONE,
  //     fulfilled_by VARCHAR,
  //     pickup_at TIMESTAMP WITHOUT TIME ZONE,
  //     dropoff_at TIMESTAMP WITHOUT TIME ZONE,
  //     canceled_at TIMESTAMP WITHOUT TIME ZONE,
  //     canceled_by VARCHAR,
  //     created_by VARCHAR,
  //     shipping_method_id INTEGER,
  //     --
  //     CONSTRAINT fulfillment_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES "order" (id),
  //     CONSTRAINT fulfillment_shipping_method_shipping_method_id_fkey FOREIGN KEY (shipping_method_id) REFERENCES shipping_method (id)
  //   );
  //   CREATE INDEX fulfillment_deleted_at_idx ON fulfillment USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, 'fulfillment_line')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE  (
  //     fulfillment_id INTEGER NOT NULL,
  //     order_line_id INTEGER,
  //     note VARCHAR,
  //     sku VARCHAR NOT NULL,
  //     barcode VARCHAR,
  //     quantity INTEGER,
  //     -- inventory_item_id INTEGER,
  //     --
  //     CONSTRAINT fulfillment_line_fulfillment_fulfillment_id_fkey FOREIGN KEY (fulfillment_id) REFERENCES fulfillment (id),
  //     CONSTRAINT fulfillment_line_order_line_order_line_id_fkey FOREIGN KEY (order_line_id) REFERENCES order_line (id)
  //   );
  //   CREATE INDEX fulfillment_line_deleted_at_idx ON fulfillment_line USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, 'fulfillment_label')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE  (
  //     fulfillment_id INTEGER NOT NULL,
  //     label VARCHAR,
  //     url VARCHAR DEFAULT '#',
  //     --
  //     CONSTRAINT fulfillment_label_fulfillment_fulfillment_id_fkey FOREIGN KEY (fulfillment_id) REFERENCES fulfillment (id)
  //   );
  //   CREATE INDEX fulfillment_label_deleted_at_idx ON fulfillment_label USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  // // ---

  await db.schema.createType('').asEnum([]).execute();
  await factory(db, 'fulfillment_address')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('fulfillment_address_type_enum')
    .asEnum(['dropoff', 'pickup'])
    .execute();

  //   CREATE TABLE  (
  //     fulfillment_id INTEGER NOT NULL,
  //     type fulfillment_address_type_enum NOT NULL,
  //     address VARCHAR NOT NULL,
  //     zip VARCHAR,
  //     first_name VARCHAR,
  //     last_name VARCHAR,
  //     phone VARCHAR,
  //     country VARCHAR,
  //     province VARCHAR,
  //     city VARCHAR,
  //     location DECIMAL(9, 6) [] NULL,
  //     --
  //     CONSTRAINT fulfillment_address_fulfillment_fulfillment_id_fkey FOREIGN KEY (fulfillment_id) REFERENCES fulfillment (id)
  //   );
  //   CREATE INDEX fulfillment_address_deleted_at_idx ON fulfillment_address USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
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
