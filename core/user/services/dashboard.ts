import { assert } from '@@common/misc/assert';
import { QueryLoginRecordService } from '@@core/login-record/services/query-login-record';
import { Inject, Injectable } from '@nestjs/common';
import { maxBy } from 'lodash';
import { DashboardInfo } from '../models/dashboard-info';

@Injectable()
export class DashboardService {
  @Inject(QueryLoginRecordService)
  private queryLoginRecordService: QueryLoginRecordService;

  async query(userId: string): Promise<DashboardInfo> {
    const loginRecords = await this.queryLoginRecordService.query({
      isActivate: null,
      userId,
      startedAt: null,
    });

    const loginCount = loginRecords.length;
    const lastRecord = maxBy(loginRecords, (x) => x.createdAt.getTime());
    assert(lastRecord, 'lastLoginTime should not be undefined.');

    return { loginCount, lastLoginTime: lastRecord.createdAt };
  }
}
