import { Inject, Injectable } from '@nestjs/common';
import { LoginRecordQueryRepo } from '../repositories/login-record-query.repo';

type FindLoginRecordOptions = {
  userId: string | null;
  isActivate: boolean | null;
  startedAt: Date | null;
};

@Injectable()
export class QueryLoginRecordService {
  @Inject(LoginRecordQueryRepo)
  private loginRecordQueryRepo: LoginRecordQueryRepo;

  async query(options: FindLoginRecordOptions) {
    const loginRecords = await this.loginRecordQueryRepo.find(options);
    return loginRecords;
  }
}
