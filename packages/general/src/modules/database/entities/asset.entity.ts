import { Column, Entity } from 'typeorm';

import { Base } from './common';

@Entity('asset')
export class AssetEntity extends Base {
  @Column({ name: 'name', type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'slug', type: 'varchar' })
  slug!: string;

  @Column({ name: 'source', type: 'varchar' })
  source!: string;

  @Column({ name: 'type', type: 'varchar', nullable: true })
  type?: string;

  @Column({ name: 'size', type: 'varchar', nullable: true })
  size?: string;
}
