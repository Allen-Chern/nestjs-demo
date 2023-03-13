import { plainToDb } from '@@common/misc/plain-to-instance';
import { UserVerificationDb } from '@@database/entities/user-verification';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserVerificationFactory } from './user-verification.factory';

export type InsertUserVerificationInput = {
  userId: string;
  invalidatedAt: Date;
};

@Injectable()
export class UserVerificationMutateRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(UserVerificationFactory)
  private userVerificationFactory: UserVerificationFactory;

  async insert(input: InsertUserVerificationInput, queryRunner?: QueryRunner) {
    const userVerificationDb = plainToDb(UserVerificationDb, {
      id: uuid(),
      userId: input.userId,
      invalidatedAt: input.invalidatedAt,
    });
    await this.dataSource
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserVerificationDb)
      .values(userVerificationDb)
      .execute();

    return this.userVerificationFactory.createUserVerification(userVerificationDb);
  }
}
