import { Inject, Injectable } from '@nestjs/common';
import { UserVerificationQueryRepo } from '../repositories/user-verification-query.repo';

@Injectable()
export class QueryUserVerificationService {
  @Inject(UserVerificationQueryRepo)
  private userVerificationQueryRepo: UserVerificationQueryRepo;

  async queryById(id: string) {
    const user = await this.userVerificationQueryRepo.findById(id);
    return user;
  }
}
