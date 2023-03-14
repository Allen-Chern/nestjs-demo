import { UserVerificationCreateModule } from '@@core/user-verification/user-verification-create.module';
import { UserVerificationQueryModule } from '@@core/user-verification/user-verification-query.module';
import { UserCreateModule } from '@@core/user/user-create.module';
import { UserQueryModule } from '@@core/user/user-query.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { PasswordService } from './services/password';
import { RegisterService } from './services/register';
import { UserUpdateModule } from './user-update.module';

@Module({
  imports: [
    UserQueryModule,
    UserCreateModule,
    UserUpdateModule,
    UserVerificationCreateModule,
    UserVerificationQueryModule,
  ],
  providers: [PasswordService, RegisterService],
  controllers: [UserController],
})
export class UserModule {}
