import { LoginRecordDb } from '@@database/entities/login-record';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { LoginRecordFactory } from './login-record.factory';

@Injectable()
export class LoginRecordQueryRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(LoginRecordFactory)
  private loginRecordFactory: LoginRecordFactory;

  private baseQuery(queryRunner?: QueryRunner) {
    return this.dataSource.createQueryBuilder(LoginRecordDb, 'loginRecord', queryRunner);
  }
}
