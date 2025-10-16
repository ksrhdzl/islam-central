import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { Base } from './common';
import { OperatorEntity } from './operator.entity';

export enum RoleStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
registerEnumType(RoleStatusEnum, { name: 'RoleStatusEnum' });

@Entity('role')
export class RoleEntity extends Base {
  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'slug', type: 'varchar', unique: true })
  slug!: string;

  @Column({
    name: 'permissions',
    type: 'varchar',
    array: true,
    default: '{}',
  })
  permissions!: string[];

  @ManyToMany(() => OperatorEntity, (obj) => obj.roles)
  @JoinTable({
    name: 'role_operator',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'operator_id', referencedColumnName: 'id' },
  })
  operators?: OperatorEntity[];

  @Column({
    name: 'status',
    type: 'enum',
    enumName: 'role_status_enum',
    enum: RoleStatusEnum,
    default: RoleStatusEnum.INACTIVE,
  })
  status!: RoleStatusEnum;
}
