import { Exclude } from 'class-transformer';
import { ProviderType } from './provider-type';

export class User {
  id: string;
  email: string;
  name: string;
  providerType: ProviderType;
  openId: string | null;
  isActivate: boolean;
  activatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;

  @Exclude()
  hashedPassword: string | null;
}
