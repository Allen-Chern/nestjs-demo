import { assert } from '@@common/misc/assert';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from './context';

export const UserId = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest() as Request;
  assert(user && user.type === 'JWT');

  return user.id;
});
