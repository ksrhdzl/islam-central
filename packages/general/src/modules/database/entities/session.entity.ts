import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ValueTransformer,
} from 'typeorm';

import { Base } from './common';
import { UserEntity } from './user.entity';

const transformer: Record<'date', ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
};

@Entity('session')
export class SessionEntity extends Base {
  @Column({ name: 'session', type: 'varchar' })
  session!: string;

  // @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  // expiredAt?: Date | null;

  @Column({ transformer: transformer.date })
  expires!: string;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @ManyToOne(() => UserEntity, (obj) => obj.members, {
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: UserEntity;
}
