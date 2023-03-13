import { UserActivatedEvent } from '@@common/events/user-activated';
import { UserVerificationCreatedEvent } from '@@common/events/user-verification-created';
import { runTransaction } from '@@common/misc/transaction';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource, QueryRunner } from 'typeorm';
import { User } from '../models/user';
import { UserMutateRepo } from '../repositories/user-mutate.repo';

@Injectable()
export class UpdateUserService {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  @Inject(UserMutateRepo)
  private userMutateRepo: UserMutateRepo;

  async activateUser(user: User, queryRunner?: QueryRunner) {
    const result = await runTransaction(this.dataSource)(async (t) => {
      user = await this.userMutateRepo.activate(user, queryRunner);

      t.pushOnCommited(() =>
        this.eventEmitter.emit(UserActivatedEvent.token, new UserVerificationCreatedEvent(user.id)),
      );

      return { user };
    });

    return result;
  }
}
