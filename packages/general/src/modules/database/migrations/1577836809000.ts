import { Migration, sql, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema
    .createType('customer_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await db.schema
    .createType('customer_gender_enum')
    .asEnum(['male', 'female', 'unknown'])
    .execute();

  await factory(db, 'customer')
    .addColumn('first_name', 'varchar', (cb) => cb)
    .addColumn('last_name', 'varchar', (cb) => cb)
    .addColumn('avatar_id', 'bigint', (cb) => cb.references('asset.id'))
    .addColumn('identifier', 'varchar', (cb) => cb.notNull())
    .addColumn('email', 'varchar', (cb) => cb)
    .addColumn('phone', 'varchar', (cb) => cb)
    .addColumn('national', 'varchar', (cb) => cb)
    .addColumn('birthday', 'timestamp')
    .addColumn('gender', sql`customer_gender_enum`, (cb) => cb)
    .addColumn('status', sql`customer_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::customer_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('customer_identifier_unique_index')
    .on('customer')
    .column('identifier')
    .unique()
    .where('identifier', 'is not', null)
    .execute();

  await db.schema
    .createIndex('customer_deleted_at_index')
    .on('customer')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'customer_address')
    .addColumn('name', 'varchar', (cb) => cb)
    .addColumn('first_name', 'varchar', (cb) => cb.notNull())
    .addColumn('last_name', 'varchar', (cb) => cb.notNull())
    .addColumn('phone', 'varchar', (cb) => cb.notNull())
    .addColumn('address', 'text', (cb) => cb.notNull())
    .addColumn('zip', 'varchar', (cb) => cb)
    .addColumn('location', sql`coordinates`, (cb) => cb)
    .addColumn('customer_id', 'bigint', (cb) => cb.notNull().references('customer.id'))
    .addColumn('country', 'varchar', (cb) => cb)
    .addColumn('province', 'varchar', (cb) => cb)
    .addColumn('city', 'varchar', (cb) => cb)
    .execute();

  await db.schema
    .createIndex('customer_address_customer_id_index')
    .on('customer_address')
    .column('customer_id')
    .where('customer_id', 'is not', null)
    .execute();

  await db.schema
    .createIndex('customer_address_deleted_at_index')
    .on('customer_address')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await db.schema
    .createType('customer_collection_status_enum')
    .asEnum(['active', 'inactive', 'archive'])
    .execute();

  await factory(db, 'customer_collection')
    .addColumn('name', 'varchar', (cb) => cb)
    .addColumn('slug', 'varchar', (cb) => cb.notNull().unique())
    .addColumn('description', 'text', (cb) => cb)
    .addColumn('status', sql`customer_collection_status_enum`, (cb) =>
      cb.notNull().defaultTo(sql`'inactive'::customer_collection_status_enum`),
    )
    .execute();

  await db.schema
    .createIndex('customer_collection_deleted_at_index')
    .on('customer_collection')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await db.schema
    .createTable('customer_customer_collection')
    .addColumn('created_at', 'timestamp', (column) => column.defaultTo(sql`now()`).notNull())
    .addColumn('customer_id', 'bigint', (cb) => cb.notNull().references('customer.id'))
    .addColumn('customer_collection_id', 'bigint', (cb) =>
      cb.notNull().references('customer_collection.id'),
    )
    .addPrimaryKeyConstraint(
      'customer_customer_collection_pkey',
      ['customer_id', 'customer_collection_id'],
      (cb) => cb,
    )
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('customer_customer_collection').ifExists().execute();
  await db.schema.dropTable('customer_collection').ifExists().execute();
  await db.schema.dropType('customer_collection_status_enum').ifExists().execute();
  await db.schema.dropTable('customer_address').ifExists().execute();
  await db.schema.dropTable('customer').ifExists().execute();
  await db.schema.dropType('customer_status_enum').ifExists().execute();
  await db.schema.dropType('customer_gender_enum').ifExists().execute();
};
