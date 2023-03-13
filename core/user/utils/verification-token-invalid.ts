import { BadRequestException } from '@nestjs/common';

export const VERIFICATION_TOKEN_INVALID_ERROR = new BadRequestException(
  'VerificationTokenInvalidError',
  'Invalid verification token.',
);
