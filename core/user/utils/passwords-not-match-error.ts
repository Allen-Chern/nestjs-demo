import { BadRequestException } from '@nestjs/common';

export const PASSWORDS_NOT_MATCH_ERROR = new BadRequestException(
  'PasswordsNotMatchError',
  'Password and confirm password are different.',
);
