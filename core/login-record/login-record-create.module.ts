import { Module } from '@nestjs/common';
import { LoginRecordFactoryModule } from './login-record-factory.module';
import { LoginRecordMutateRepo } from './repositories/login-record-mutate.repo';
import { CreateLoginRecordService } from './services/create-login-record';

@Module({
  imports: [LoginRecordFactoryModule],
  providers: [LoginRecordMutateRepo, CreateLoginRecordService],
  exports: [CreateLoginRecordService],
})
export class LoginRecordCreateModule {}
