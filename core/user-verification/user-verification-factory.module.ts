import { Module } from '@nestjs/common';
import { UserVerificationFactory } from './repositories/user-verification.factory';

@Module({
  providers: [UserVerificationFactory],
  exports: [UserVerificationFactory],
})
export class UserVerificationFactoryModule {}
