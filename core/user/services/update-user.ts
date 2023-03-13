import { UserActivatedEvent } from '@@common/events/user-activated';
import { UserVerificationCreatedEvent } from '@@common/events/user-verification-created';
import { Argon2 } from '@@common/helpers/argon2';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
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

  @Inject(Argon2)
  private argon2: Argon2;

  async activateUser(user: User) {
    user = await this.userMutateRepo.activate(user);
    this.eventEmitter.emit(UserActivatedEvent.token, new UserVerificationCreatedEvent(user.id));

    return user;
  }

  async updatePassword(user: User, password: string) {
    const hashedPassword = await this.argon2.hash(password);
    user = await this.userMutateRepo.updatePassword(user, hashedPassword);

    return user;
  }
}
