import { UserDb } from '@@database/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { ProviderType } from '../models/provider-type';
import { UserFactory } from './user.factory';

@Injectable()
export class UserQueryRepo {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(UserFactory)
  private userFactory: UserFactory;

  private baseQuery(queryRunner?: QueryRunner) {
    return this.dataSource.createQueryBuilder(UserDb, 'user', queryRunner);
  }

  async findById(id: string, queryRunner?: QueryRunner) {
    const userDb = await this.baseQuery(queryRunner).andWhereInIds(id).getOne();

    return userDb && this.userFactory.createUser(userDb);
  }

  async findByEmail(email: string, queryRunner?: QueryRunner) {
    const userDb = await this.baseQuery(queryRunner)
      .andWhere('user.email = :email', { email })
      .andWhere('user.providerType = :providerType', { providerType: ProviderType.BASIC })
      .getOne();

    return userDb && this.userFactory.createUser(userDb);
  }

  async findByOpenId(openId: string, providerType: ProviderType, queryRunner?: QueryRunner) {
    const userDb = await this.baseQuery(queryRunner)
      .andWhere('user.openId = :openId', { openId })
      .andWhere('user.providerType = :providerType', { providerType })
      .getOne();

    return userDb && this.userFactory.createUser(userDb);
  }
}
