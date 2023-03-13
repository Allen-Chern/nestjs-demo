import { plainToDb } from '@@common/misc/plain-to-instance';
import { LoginRecordDb } from '@@database/entities/login-record';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { LoginRecordFactory } from './login-record.factory';

@Injectable()
export class LoginRecordMutateRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(LoginRecordFactory)
  private loginRecordFactory: LoginRecordFactory;

  async insert(userId: string, queryRunner?: QueryRunner) {
    const loginRecordDb = plainToDb(LoginRecordDb, {
      userId,
    });
    await this.dataSource
      .createQueryBuilder(queryRunner)
      .insert()
      .into(LoginRecordDb)
      .values(loginRecordDb)
      .execute();

    return this.loginRecordFactory.createLoginRecord(loginRecordDb);
  }
}
