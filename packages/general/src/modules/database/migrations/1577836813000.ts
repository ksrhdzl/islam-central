import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  //   CREATE TABLE warehouse_address (
  //     address VARCHAR NOT NULL,
  //     phone VARCHAR,
  //     zip VARCHAR,
  //     country VARCHAR,
  //     province VARCHAR,
  //     city VARCHAR,
  //     location DECIMAL(9, 6) [] NULL
  //   );
  //   CREATE INDEX warehouse_address_deleted_at_idx ON warehouse_address USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
  await factory(db, '')
    .addColumn('', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createType('warehouse_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  //   CREATE TABLE warehouse (
  //     name VARCHAR,
  //     slug VARCHAR NOT NULL CONSTRAINT warehouse_slug_key UNIQUE,
  //     description VARCHAR,
  //     address_id INTEGER,
  //     status warehouse_status_enum DEFAULT 'inactive'::warehouse_status_enum NOT NULL,
  //     --
  //     CONSTRAINT warehouse_warehouse_address_address_id_fkey FOREIGN KEY (address_id) REFERENCES warehouse_address (id)
  //   );
  //   CREATE INDEX warehouse_deleted_at_idx ON "warehouse" USING btree (deleted_at)
  //   WHERE
  //     deleted_at IS NOT NULL;
  // ");
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('warehouse').ifExists().execute();
  await db.schema.dropType('warehouse_status_enum').ifExists().execute();
  await db.schema.dropTable('warehouse_address').ifExists().execute();
};
