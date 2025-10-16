import { Migration, type Kysely } from 'kysely';
import { factory } from '../utilities';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await factory(db, 'auth_identity')
    .addColumn('identifier', 'varchar', (cb) => cb.notNull().unique())
    .execute();

  await db.schema
    .createIndex('auth_identity_identifier_index')
    .on('auth_identity')
    .column('identifier')
    .unique()
    .where('identifier', 'is not', null)
    .execute();

  await db.schema
    .createIndex('auth_identity_deleted_at_index')
    .on('auth_identity')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();

  await factory(db, 'auth_provider')
    .addColumn('auth_identity_id', 'bigint', (cb) => cb.notNull().references('auth_identity.id'))
    .addColumn('context', 'varchar', (cb) => cb.notNull())
    .addColumn('auth_metadata', 'jsonb', (col) => col.defaultTo('{}').notNull())
    .addColumn('provider', 'varchar', (cb) => cb.notNull())
    .addColumn('provider_metadata', 'jsonb', (col) => col.defaultTo('{}').notNull())
    .addUniqueConstraint(
      'auth_provider_auth_identity_id_provider_context_key',
      ['auth_identity_id', 'provider', 'context'],
      (cb) => cb,
    )
    .execute();

  await db.schema
    .createIndex('auth_provider_auth_identity_id_index')
    .on('auth_provider')
    .column('auth_identity_id')
    .where('auth_identity_id', 'is not', null)
    .execute();

  await db.schema
    .createIndex('auth_provider_deleted_at_index')
    .on('auth_provider')
    .column('deleted_at')
    .where('deleted_at', 'is not', null)
    .execute();
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropTable('auth_provider').ifExists().execute();
  await db.schema.dropTable('auth_identity').ifExists().execute();
};
