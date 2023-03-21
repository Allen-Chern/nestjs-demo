import { LoginRecordQueryModule } from '@@core/login-record/login-record-query.module';
import { UserVerificationCreateModule } from '@@core/user-verification/user-verification-create.module';
import { UserVerificationQueryModule } from '@@core/user-verification/user-verification-query.module';
import { UserCreateModule } from '@@core/user/user-create.module';
import { UserQueryModule } from '@@core/user/user-query.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { DashboardService } from './services/dashboard';
import { PasswordService } from './services/password';
import { RegisterService } from './services/register';
import { StatisticsService } from './services/statistics';
import { UserUpdateModule } from './user-update.module';

@Module({
  imports: [
    UserQueryModule,
    UserCreateModule,
    UserUpdateModule,
    UserVerificationCreateModule,
    UserVerificationQueryModule,
    LoginRecordQueryModule,
  ],
  providers: [PasswordService, RegisterService, DashboardService, StatisticsService],
  controllers: [UserController],
})
export class UserModule {}
