import { BadRequestException } from '@nestjs/common';

export const USER_ALREADY_EXIST_ERROR = new BadRequestException(
  'UserAlreadyExistError',
  'User has already exist.',
);
