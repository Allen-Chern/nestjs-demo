import { AccessJwt } from '@@common/helpers/access-jwt';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject(AccessJwt)
  private accessJwt: AccessJwt;

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
      try {
        const payload = this.accessJwt.verify(token);
        req.user = payload;
      } catch (err) {
        console.error(err);
      }
    }
    next();
  }
}
