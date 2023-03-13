import { UserVerificationCreatedEvent } from '@@common/events/user-verification-created';
import { runTransaction } from '@@common/misc/transaction';
import { CreateUserVerificationService } from '@@core/user-verification/services/create-user-verification';
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';
import { CreateUserService } from './create-user';

type RegisterInput = {
  email: string;
  name: string;
  password: string;
};

@Injectable()
export class RegisterService {
  @Inject(DataSource)
  private dataSource: DataSource;

  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  @Inject(CreateUserService)
  private createUserService: CreateUserService;

  @Inject(CreateUserVerificationService)
  private createUserVerificationService: CreateUserVerificationService;

  async create(input: RegisterInput) {
    const result = await runTransaction(this.dataSource)(async (t) => {
      const user = await this.createUserService.createBasicUser(
        { email: input.email, name: input.name, password: input.password },
        t.queryRunner,
      );
      const verification = await this.createUserVerificationService.create(user.id);

      t.pushOnCommited(() =>
        this.eventEmitter.emit(
          UserVerificationCreatedEvent.token,
          new UserVerificationCreatedEvent(verification.id),
        ),
      );

      return { user, verification };
    });

    return result;
  }
}
