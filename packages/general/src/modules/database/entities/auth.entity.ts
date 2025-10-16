// import {
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   ValueTransformer,
// } from 'typeorm';
// import { Base } from './common';
// import { UserEntity } from './user.entity';

// const transformer: Record<'bigint' | 'date', ValueTransformer> = {
//   bigint: {
//     from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
//     to: (bigInt?: number) => bigInt?.toString(),
//   },
//   date: {
//     from: (date: string | null) => date && new Date(parseInt(date, 10)),
//     to: (date?: Date) => date?.valueOf().toString(),
//   },
// };

// @Entity('auth')
// export class AuthEntity extends Base {
//   @Column({ name: 'user_id', type: 'int' })
//   userId!: number;

//   @ManyToOne(() => UserEntity, (obj) => obj.auths, {
//     nullable: true,
//   })
//   @JoinColumn({
//     name: 'user_id',
//     referencedColumnName: 'id',
//   })
//   user?: UserEntity;

//   @Column({ name: 'type', type: 'varchar' })
//   type!: string;

//   @Column({ name: 'provider', type: 'varchar' })
//   provider!: string;

//   @Column({ name: 'provider_id', type: 'varchar' })
//   providerId!: string;

//   @Column({ name: 'token_type', type: 'varchar', nullable: true })
//   tokenType!: string | null;

//   @Column({ name: 'token_id', type: 'varchar', nullable: true })
//   tokenId!: string;

//   @Column({ name: 'refresh_token', type: 'varchar' })
//   refreshToken!: string | null;

//   @Column({ name: 'access_token', type: 'varchar' })
//   accessToken!: string | null;

//   @Column({
//     name: 'expires_at',
//     type: 'bigint',
//     nullable: true,
//     transformer: transformer.bigint,
//   })
//   expiresAt!: number | null;

//   @Column({ name: 'scope', type: 'varchar', nullable: true })
//   scope!: string;

//   @Column({ name: 'session_state', type: 'varchar', nullable: true })
//   sessionState!: string | null;
// }

// @Entity('auth_verification_token')
// export class AuthVerificationTokenEntity extends Base {
//   @Column({ name: 'identifier', type: 'varchar' })
//   identifier!: string;

//   @Column({ name: 'token', type: 'varchar' })
//   token!: string;

//   @Column({ name: 'expires', type: 'timestamp' })
//   expires!: Date;
// }

// @Entity('auth_confirmation_token')
// export class AuthConfirmationTokenEntity extends Base {
//   @Column({ name: 'identifier', type: 'varchar' })
//   identifier!: string;

//   @Column({ name: 'token', type: 'varchar' })
//   token!: string;
// }
