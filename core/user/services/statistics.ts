import { QueryLoginRecordService } from '@@core/login-record/services/query-login-record';
import { Inject, Injectable } from '@nestjs/common';
import uniqBy from 'lodash/uniqBy';
import { StatisticsInfo } from '../models/statistics-info';
import { QueryUserService } from './query-user';

@Injectable()
export class StatisticsService {
  @Inject(QueryUserService)
  private queryUserService: QueryUserService;

  @Inject(QueryLoginRecordService)
  private queryLoginRecordService: QueryLoginRecordService;

  async query(): Promise<StatisticsInfo> {
    const today = new Date(new Date().toISOString().slice(0, 10));
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // for totalUsers
    const users = await this.queryUserService.query();

    const loginRecords = await this.queryLoginRecordService.query({
      isActivate: true,
      userId: null,
      startedAt: sevenDaysAgo,
    });

    // for activeSessionUsers
    const todayLoginRecords = loginRecords.filter((x) => x.createdAt >= today);
    const todayLoginRecordsUniqByUserId = uniqBy(todayLoginRecords, (x) => x.userId);

    // for avgSevenDayUsers
    const distinctRecords = uniqBy(
      loginRecords,
      (x) => x.createdAt.toISOString().slice(0, 10) + x.userId,
    );

    const totalUsers = users.length;
    const activeSessionUsers = todayLoginRecordsUniqByUserId.length;
    const avgSevenDayUsers = distinctRecords.length / 7.0;

    return { totalUsers, activeSessionUsers, avgSevenDayUsers };
  }
}
