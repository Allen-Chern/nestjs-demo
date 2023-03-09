import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login_records')
export class LoginRecordDb {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  userId: string;

  @Column('timestamptz', { default: () => 'now()' })
  createdAt: Date;
}
