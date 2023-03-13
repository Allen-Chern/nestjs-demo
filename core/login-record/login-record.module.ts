import { Module } from '@nestjs/common';
import { LoginRecordCreateModule } from './login-record-create.module';

@Module({
  imports: [LoginRecordCreateModule],
})
export class LoginRecordModule {}
