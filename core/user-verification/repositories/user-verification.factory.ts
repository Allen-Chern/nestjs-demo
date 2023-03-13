import { plainToModel } from '@@common/misc/plain-to-instance';
import { UserVerificationDb } from '@@database/entities/user-verification';
import { Injectable } from '@nestjs/common';
import { UserVerification } from '../models/user-verification';

@Injectable()
export class UserVerificationFactory {
  createUserVerification(userVerificationDb: UserVerificationDb) {
    return plainToModel(UserVerification, {
      id: userVerificationDb.id,
      userId: userVerificationDb.userId,
      invalidatedAt: userVerificationDb.invalidatedAt,
      createdAt: userVerificationDb.createdAt,
    });
  }
}
