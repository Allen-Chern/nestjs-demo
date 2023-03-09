import { plainToDb } from '@@common/misc/plain-to-instance';
import { UserDb } from '@@database/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProviderType } from '../models/provider-type';
import { UserFactory } from './user.factory';

export type InsertUserInput =
  | {
      email: string;
      hashedPassword: string;
      name: string;
      providerType: ProviderType.BASIC;
      openId: null;
    }
  | {
      email: string;
      hashedPassword: null;
      name: string;
      providerType: ProviderType.FACEBOOK | ProviderType.GOOGLE;
      openId: string;
    };

@Injectable()
export class UserMutateRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(UserFactory)
  private userFactory: UserFactory;

  async insert(input: InsertUserInput, queryRunner?: QueryRunner) {
    const userDb = plainToDb(UserDb, {
      id: uuid(),
      email: input.email,
      hashedPassword: input.hashedPassword,
      name: input.name,
      providerType: input.providerType,
      openId: input.openId,
    });
    await this.dataSource
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserDb)
      .values(userDb)
      .execute();

    return this.userFactory.createUser(userDb);
  }
}
