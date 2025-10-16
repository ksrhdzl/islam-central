import { registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany } from 'typeorm';

import { Base } from './common';
import { RoleEntity } from './role.entity';

export enum OperatorStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
registerEnumType(OperatorStatusEnum, { name: 'OperatorStatusEnum' });

@Entity('operator')
export class OperatorEntity extends Base {
  @Column({ name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName!: string;

  @Column({ name: 'email', type: 'varchar' })
  email!: string;

  @Column({ name: 'password', type: 'varchar' })
  password!: string;

  @ManyToMany(() => RoleEntity, (obj) => obj.operators)
  roles?: RoleEntity[];

  @Column({
    name: 'status',
    type: 'enum',
    enumName: 'operator_status_enum',
    enum: OperatorStatusEnum,
    default: OperatorStatusEnum.INACTIVE,
  })
  status!: OperatorStatusEnum;
}
