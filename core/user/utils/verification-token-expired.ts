import { BadRequestException } from '@nestjs/common';

export const VERIFICATION_TOKEN_EXPIRED_ERROR = new BadRequestException(
  'VerificationTokenExpiredError',
  'Expired verification token.',
);
