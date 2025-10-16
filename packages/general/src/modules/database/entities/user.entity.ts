import { Column, Entity, OneToMany } from 'typeorm';

import { Base } from './common';
import { MemberEntity } from './member.entity';

// import { AuthEntity, AuthTwoFactorConfirmationEntity } from './auth.entity';
// import { SessionEntity } from './session.entity';

// const transformer: Record<'date', ValueTransformer> = {
//   date: {
//     from: (date: string | null) => date && new Date(parseInt(date, 10)),
//     to: (date?: Date) => date?.valueOf().toString(),
//   },
// };

@Entity('user')
export class UserEntity extends Base {
  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'slug', type: 'varchar', nullable: true })
  slug?: string;

  @Column({ name: 'email', type: 'varchar' })
  email!: string;

  // @Column({ type: 'varchar', nullable: true, transformer: transformer.date })
  // emailVerified!: string | null;

  @Column({ name: 'password', type: 'varchar' })
  password!: string;

  // @OneToMany(() => AuthEntity, (obj) => obj.user, {
  //   nullable: true,
  // })
  // auths!: AuthEntity[];

  @OneToMany(() => MemberEntity, (obj) => obj.user, {
    nullable: true,
  })
  members?: MemberEntity[];

  // @Column({ name: 'is_two_factor_enabled', type: 'boolean', default: false })
  // isTwoFactorEnabled!: string;

  // @OneToMany(() => AuthTwoFactorConfirmationEntity, (obj) => obj.user, {
  //   nullable: true,
  // })
  // twoFactorConfirmation?: AuthTwoFactorConfirmationEntity[];

  // @OneToMany(() => SessionEntity, (session) => session.userId)
  // sessions!: SessionEntity[];
}
