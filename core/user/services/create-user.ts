import { Argon2 } from '@@common/helpers/argon2';
import { Inject, Injectable } from '@nestjs/common';
import { ProviderType } from '../models/provider-type';
import { InsertUserInput, UserMutateRepo } from '../repositories/user-mutate.repo';

type InsertBasicUserInput = {
  email: string;
  name: string;
  password: string;
};
type InsertSocialUserInput = {
  email: string;
  name: string;
  openId: string;
};

@Injectable()
export class CreateUserService {
  @Inject(UserMutateRepo)
  private userMutateRepo: UserMutateRepo;

  @Inject(Argon2)
  private argon2: Argon2;

  private async createUser(input: InsertUserInput) {
    const user = await this.userMutateRepo.insert(input);
    return user;
  }

  async createBasicUser(input: InsertBasicUserInput) {
    const hashedPassword = await this.argon2.hash(input.password);
    const user = await this.createUser({
      email: input.email,
      hashedPassword,
      name: input.name,
      providerType: ProviderType.BASIC,
      openId: null,
    });
    return user;
  }

  async createFacebookUser(input: InsertSocialUserInput) {
    const user = await this.createUser({
      email: input.email,
      hashedPassword: null,
      name: input.name,
      providerType: ProviderType.FACEBOOK,
      openId: input.openId,
    });
    return user;
  }

  async createGoogleUser(input: InsertSocialUserInput) {
    const user = await this.createUser({
      email: input.email,
      hashedPassword: null,
      name: input.name,
      providerType: ProviderType.GOOGLE,
      openId: input.openId,
    });
    return user;
  }
}
