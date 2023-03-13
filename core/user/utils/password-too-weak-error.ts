import { BadRequestException } from '@nestjs/common';

export const PASSWORD_TOO_WEAK_ERROR = new BadRequestException(
  'PasswordTooWeakError',
  'Password is too weak.',
);
