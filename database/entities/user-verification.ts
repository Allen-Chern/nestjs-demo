import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_verifications')
export class UserVerificationDb {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('timestamptz')
  invalidatedAt: Date;

  @Column('timestamptz', { default: () => 'now()' })
  createdAt: Date;
}
