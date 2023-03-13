import { Inject, Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { USER_VERIFICATION_EXPIRES_IN_MINUTES_TOKEN } from '../config';
import { UserVerificationMutateRepo } from '../repositories/user-verification-mutate.repo';

@Injectable()
export class CreateUserVerificationService {
  @Inject(UserVerificationMutateRepo)
  private userVerificationMutateRepo: UserVerificationMutateRepo;

  @Inject(USER_VERIFICATION_EXPIRES_IN_MINUTES_TOKEN)
  private expiresInMinutes: number;

  async create(userId: string, queryRunner?: QueryRunner) {
    const invalidatedAt = new Date(Date.now() + 1000 * 60 * this.expiresInMinutes);
    const userVerification = await this.userVerificationMutateRepo.insert(
      {
        userId,
        invalidatedAt,
      },
      queryRunner,
    );
    return userVerification;
  }
}
