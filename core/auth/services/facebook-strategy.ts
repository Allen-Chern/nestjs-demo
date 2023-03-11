import { assert } from '@@common/misc/assert';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import {
  FACEBOOK_APP_ID_TOKEN,
  FACEBOOK_APP_SECRET_TOKEN,
  FACEBOOK_CALLBACK_URL_TOKEN,
} from '../config';
import { FacebookPayload } from '../utils/payload';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject(FACEBOOK_APP_ID_TOKEN) private readonly appId: string,
    @Inject(FACEBOOK_APP_SECRET_TOKEN) private readonly appSecret: string,
    @Inject(FACEBOOK_CALLBACK_URL_TOKEN) private readonly callbackUrl: string,
  ) {
    super({
      clientID: appId,
      clientSecret: appSecret,
      callbackURL: callbackUrl,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, name, emails } = profile;
    assert(name, 'name is undefined.');
    assert(emails, 'emails is undefined.');

    const payload: FacebookPayload = {
      openId: id,
      email: emails[0].value,
      name: name.givenName,
      type: 'FACEBOOK',
    };
    done(null, payload);
  }
}
