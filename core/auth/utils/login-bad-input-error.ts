import { BadRequestException } from '@nestjs/common';

export const LOGIN_BAD_INPUT_ERROR = new BadRequestException(
  'LoginBadInputError',
  'Email or password is incorrect',
);
