import { Module } from '@nestjs/common';
import { LoginRecordFactoryModule } from './login-record-factory.module';
import { LoginRecordQueryRepo } from './repositories/login-record-query.repo';
import { QueryLoginRecordService } from './services/query-login-record';

@Module({
  imports: [LoginRecordFactoryModule],
  providers: [LoginRecordQueryRepo, QueryLoginRecordService],
  exports: [QueryLoginRecordService],
})
export class LoginRecordQueryModule {}
