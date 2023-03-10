import { ProviderType } from './provider-type';

export class User {
  id: string;
  email: string;
  hashedPassword: string | null;
  name: string;
  providerType: ProviderType;
  openId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
