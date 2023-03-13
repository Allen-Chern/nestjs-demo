import { UserVerificationDb } from '@@database/entities/user-verification';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { UserVerificationFactory } from './user-verification.factory';

@Injectable()
export class UserVerificationQueryRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(UserVerificationFactory)
  private userVerificationFactory: UserVerificationFactory;

  private baseQuery(queryRunner?: QueryRunner) {
    return this.dataSource.createQueryBuilder(UserVerificationDb, 'userVerification', queryRunner);
  }

  async findById(id: string, queryRunner?: QueryRunner) {
    const userVerificationDb = await this.baseQuery(queryRunner).andWhereInIds(id).getOne();

    return (
      userVerificationDb && this.userVerificationFactory.createUserVerification(userVerificationDb)
    );
  }
}
