import { UserLoggedInEvent } from '@@common/events/user-logged-in';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LoginRecordMutateRepo } from '../repositories/login-record-mutate.repo';

@Injectable()
export class CreateLoginRecordService {
  @Inject(LoginRecordMutateRepo)
  private loginRecordMutateRepo: LoginRecordMutateRepo;

  async create(userId: string) {
    const loginRecord = await this.loginRecordMutateRepo.insert(userId);
    return loginRecord;
  }

  @OnEvent(UserLoggedInEvent.token)
  async onUserLoggedIn(payload: UserLoggedInEvent) {
    await this.create(payload.id);
  }
}
