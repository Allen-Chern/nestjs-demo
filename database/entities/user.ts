import { ProviderType, ProviderTypeEnumName } from '@@database/types/provider-type';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserDb {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { nullable: true })
  hashedPassword: string | null;

  @Column('varchar')
  name: string;

  @Column('enum', { enumName: ProviderTypeEnumName, enum: ProviderType })
  providerType: ProviderType;

  @Column('varchar', { nullable: true })
  openId: string | null;

  @Column('timestamptz', { default: () => 'now()' })
  createdAt: Date;

  @Column('timestamptz', { nullable: true })
  updatedAt: Date | null;
}
