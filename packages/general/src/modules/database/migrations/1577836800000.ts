import { Migration, sql, type Kysely } from 'kysely';

export const up: Migration['up'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.createType('dimension_unit_enum').asEnum(['in', 'mm', 'cm']).execute();
  await db.schema.createType('weight_unit_enum').asEnum(['lb', 'g', 'kg']).execute();
  await sql`CREATE TYPE coordinates AS (latitude DECIMAL(9, 6), longitude DECIMAL(9, 6));`.execute(
    db,
  );
};

export const down: Migration['down'] = async (db: Kysely<any>): Promise<void> => {
  await db.schema.dropType('coordinates').ifExists().execute();
  await db.schema.dropType('dimension_unit_enum').ifExists().execute();
  await db.schema.dropType('weight_unit_enum').ifExists().execute();
};
