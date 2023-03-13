import { BadRequestException } from '@nestjs/common';

export const USER_ALREADY_ACTIVATED_ERROR = new BadRequestException(
  'UserAlreadyActivatedError',
  'User has already activated.',
);
