import { BadRequestException } from '@nestjs/common';

export const PASSWORD_INCORRECT_ERROR = new BadRequestException(
  'PasswordIncorrectError',
  'Password is incorrect',
);
