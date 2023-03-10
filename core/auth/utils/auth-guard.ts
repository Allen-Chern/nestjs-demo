import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessJwt } from '../services/access-jwt';
import { Request } from './context';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AccessJwt)
  private accessJwt: AccessJwt;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.cookies['token'];
    if (token) {
      const payload = this.accessJwt.verify(token);
      if (payload !== undefined) {
        request.user = payload;
        return true;
      }
    }

    return false;
  }
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
