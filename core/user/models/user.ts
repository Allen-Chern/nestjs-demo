import { Exclude } from 'class-transformer';
import { ProviderType } from './provider-type';

export class User {
  id: string;
  email: string;
  name: string;
  isActivate: boolean;
  providerType: ProviderType;
  createdAt: Date;

  @Exclude()
  hashedPassword: string | null;
  @Exclude()
  openId: string | null;
  @Exclude()
  activatedAt: Date | null;
  @Exclude()
  updatedAt: Date | null;
}
