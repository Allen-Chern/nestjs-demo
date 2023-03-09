import { Inject, Injectable } from '@nestjs/common';
import { ProviderType } from '../models/provider-type';
import { UserQueryRepo } from '../repositories/user-query.repo';

@Injectable()
export class QueryUserService {
  @Inject(UserQueryRepo)
  private userQueryRepo: UserQueryRepo;

  async queryById(id: string) {
    const user = await this.userQueryRepo.findById(id);
    return user;
  }

  async queryByBasicEmail(email: string) {
    const user = await this.userQueryRepo.findByEmail(email);
    return user;
  }

  async queryByFacebookId(openId: string) {
    const user = await this.userQueryRepo.findByOpenId(openId, ProviderType.FACEBOOK);
    return user;
  }

  async queryByGoogleId(openId: string) {
    const user = await this.userQueryRepo.findByOpenId(openId, ProviderType.GOOGLE);
    return user;
  }
}
