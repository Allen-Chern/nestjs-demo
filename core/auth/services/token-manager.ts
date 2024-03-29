import { UserLoggedInEvent } from '@@common/events/user-logged-in';
import { AccessJwt } from '@@common/helpers/access-jwt';
import { User } from '@@core/user/models/user';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Response } from 'express';
import { UserPayload } from '../utils/payload';

@Injectable()
export class TokenManager {
  private logger = new Logger(TokenManager.name);

  @Inject(AccessJwt)
  private accessJwt: AccessJwt;

  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  private async createPayload(user: User): Promise<UserPayload> {
    return {
      id: user.id,
      isActivate: user.isActivate,
      type: 'JWT',
    };
  }

  async setToken(response: Response, user: User) {
    const payload = await this.createPayload(user);
    const token = this.accessJwt.sign(payload);

    response.cookie('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });

    this.eventEmitter.emit(UserLoggedInEvent.token, new UserLoggedInEvent(user.id));

    return token;
  }

  clearToken(response: Response) {
    response.clearCookie('token', { httpOnly: true, secure: true, path: '/', sameSite: 'none' });
  }
}
