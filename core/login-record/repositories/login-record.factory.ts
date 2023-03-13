import { plainToModel } from '@@common/misc/plain-to-instance';
import { LoginRecordDb } from '@@database/entities/login-record';
import { Injectable } from '@nestjs/common';
import { LoginRecord } from '../models/login-record';

@Injectable()
export class LoginRecordFactory {
  createLoginRecord(loginRecordDb: LoginRecordDb) {
    return plainToModel(LoginRecord, {
      id: loginRecordDb.id,
      userId: loginRecordDb.userId,
      createdAt: loginRecordDb.createdAt,
    });
  }
}
