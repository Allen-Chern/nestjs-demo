import { LoginRecordDb } from '@@database/entities/login-record';
import { Inject, Injectable } from '@nestjs/common';
import isNil from 'lodash/isNil';
import { DataSource, QueryRunner } from 'typeorm';
import { LoginRecordFactory } from './login-record.factory';

type FindOptions = {
  userId: string | null;
  isActivate: boolean | null;
  startedAt: Date | null;
};

@Injectable()
export class LoginRecordQueryRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(LoginRecordFactory)
  private loginRecordFactory: LoginRecordFactory;

  private baseQuery(queryRunner?: QueryRunner) {
    return this.dataSource.createQueryBuilder(LoginRecordDb, 'loginRecord', queryRunner);
  }

  async find(options: FindOptions, queryRunner?: QueryRunner) {
    const { userId, isActivate, startedAt } = options;
    const query = await this.baseQuery(queryRunner).innerJoin('loginRecord.user', 'user');

    if (userId) {
      query.andWhere('loginRecord.userId = :userId', {
        userId,
      });
    }

    if (!isNil(isActivate)) {
      query.andWhere('user.isActivate = :isActivate', {
        isActivate,
      });
    }

    if (startedAt) {
      query.andWhere('loginRecord.createdAt >= :startedAt', {
        startedAt,
      });
    }

    const loginRecordDbs = await query.getMany();

    return loginRecordDbs.map((x) => this.loginRecordFactory.createLoginRecord(x));
  }
}
