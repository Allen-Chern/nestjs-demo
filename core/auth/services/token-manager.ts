import { User } from '@@core/user/models/user';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';
import { UserPayload } from '../utils/payload';
import { AccessJwt } from './access-jwt';

@Injectable()
export class TokenManager {
  private logger = new Logger(TokenManager.name);

  @Inject(AccessJwt)
  private accessJwt: AccessJwt;

  private async createPayload(user: User): Promise<UserPayload> {
    return {
      id: user.id,
      type: 'JWT',
    };
  }

  async setToken(response: Response, user: User) {
    const payload = await this.createPayload(user);
    const token = this.accessJwt.sign(payload);

    response.cookie('token', token, { httpOnly: true, secure: true, path: '/' });
  }

  clearToken(response: Response) {
    response.clearCookie('token', { httpOnly: true, secure: true, path: '/' });
  }
}
