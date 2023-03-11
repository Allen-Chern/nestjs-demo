import { assert } from '@@common/misc/assert';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GOOGLE_APP_ID_TOKEN, GOOGLE_APP_SECRET_TOKEN, GOOGLE_CALLBACK_URL_TOKEN } from '../config';
import { GooglePayload } from '../utils/payload';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(GOOGLE_APP_ID_TOKEN) private readonly appId: string,
    @Inject(GOOGLE_APP_SECRET_TOKEN) private readonly appSecret: string,
    @Inject(GOOGLE_CALLBACK_URL_TOKEN) private readonly callbackUrl: string,
  ) {
    super({
      clientID: appId,
      clientSecret: appSecret,
      callbackURL: callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails } = profile;
    assert(name, 'name is undefined.');
    assert(emails, 'emails is undefined.');

    const payload: GooglePayload = {
      openId: id,
      email: emails[0].value,
      name: name.givenName,
      type: 'GOOGLE',
    };
    done(null, payload);
  }
}
