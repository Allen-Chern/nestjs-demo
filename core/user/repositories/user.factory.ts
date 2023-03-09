import { plainToModel } from '@@common/misc/plain-to-instance';
import { UserDb } from '@@database/entities/user';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';

@Injectable()
export class UserFactory {
  createUser(userDb: UserDb) {
    return plainToModel(User, {
      id: userDb.id,
      email: userDb.email,
      hashedPassword: userDb.hashedPassword,
      name: userDb.name,
      providerType: userDb.providerType,
      openId: userDb.openId,
      createdAt: userDb.createdAt,
      updatedAt: userDb.updatedAt,
    });
  }
}
