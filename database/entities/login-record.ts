import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDb } from './user';

@Entity('login_records')
export class LoginRecordDb {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  userId: string;

  @Column('timestamptz', { default: () => 'now()' })
  createdAt: Date;

  @ManyToOne(() => UserDb, (user) => user.loginRecords)
  @JoinColumn({ name: 'userId' })
  user: UserDb;
}
