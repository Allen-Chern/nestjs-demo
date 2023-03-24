import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from './context';
import { PERMISSION_ERROR } from './permission-error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest() as Request;

    if (!user || user.type !== 'JWT') throw new UnauthorizedException();

    const checkActivate =
      this.reflector.get<boolean>('checkActivate', context.getHandler()) || false;
    if (checkActivate && !user.isActivate) {
      throw PERMISSION_ERROR;
    }

    return true;
  }
}

export function AccountBasicAuth() {
  return applyDecorators(UseGuards(AuthGuard));
}

export function Auth() {
  return applyDecorators(SetMetadata('checkActivate', true), UseGuards(AuthGuard));
}
