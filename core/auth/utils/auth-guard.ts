import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from './context';

/** @TODO implement AuthGuard */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    console.log(request.user);

    return true;
  }
}

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
