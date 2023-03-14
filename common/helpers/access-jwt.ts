import { ACCESS_JWT_EXPIRES_IN_SECONDS_TOKEN, ACCESS_JWT_SECRET_TOKEN } from '@@common/config';
import { Jwt } from '@@common/misc/jwt';
import { Payload } from '@@core/auth/utils/payload';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AccessJwt extends Jwt<Payload> {
  constructor(
    @Inject(ACCESS_JWT_SECRET_TOKEN) secret: string,
    @Inject(ACCESS_JWT_EXPIRES_IN_SECONDS_TOKEN) expiresIn: number | undefined,
  ) {
    super(secret, expiresIn);
  }
}
