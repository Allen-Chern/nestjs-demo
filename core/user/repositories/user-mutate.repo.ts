import { plainToDb } from '@@common/misc/plain-to-instance';
import { UserDb } from '@@database/entities/user';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProviderType } from '../models/provider-type';
import { User } from '../models/user';
import { UserFactory } from './user.factory';

export type InsertUserInput =
  | {
      email: string;
      hashedPassword: string;
      name: string;
      providerType: ProviderType.BASIC;
      openId: null;
      isActivate: false;
    }
  | {
      email: string;
      hashedPassword: null;
      name: string;
      providerType: ProviderType.FACEBOOK | ProviderType.GOOGLE;
      openId: string;
      isActivate: true;
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
      isActivate: input.isActivate,
      activatedAt: input.isActivate ? new Date() : null,
    });
    await this.dataSource
      .createQueryBuilder(queryRunner)
      .insert()
      .into(UserDb)
      .values(userDb)
      .execute();

    return this.userFactory.createUser(userDb);
  }

  async activate(user: User, queryRunner?: QueryRunner) {
    const currentTime = new Date();

    await this.dataSource
      .createQueryBuilder(queryRunner)
      .update(UserDb)
      .set({ isActivate: true, activatedAt: currentTime })
      .whereInIds(user.id)
      .execute();
    user.isActivate = true;
    user.activatedAt = currentTime;

    return user;
  }
}
