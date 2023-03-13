import { Module } from '@nestjs/common';
import { LoginRecordFactory } from './repositories/login-record.factory';

@Module({
  providers: [LoginRecordFactory],
  exports: [LoginRecordFactory],
})
export class LoginRecordFactoryModule {}
