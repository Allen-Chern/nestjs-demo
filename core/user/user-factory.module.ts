import { Module } from '@nestjs/common';
import { UserFactory } from './repositories/user.factory';

@Module({
  providers: [UserFactory],
  exports: [UserFactory],
})
export class UserFactoryModule {}
