import { UserVerificationQueryModule } from '@@core/user-verification/user-verification-query.module';
import { UserQueryModule } from '@@core/user/user-query.module';
import { Module } from '@nestjs/common';
import { UserEmailService } from './listeners/user';
import { Mailer } from './services/mailer';

@Module({
  imports: [UserQueryModule, UserVerificationQueryModule],
  providers: [Mailer, UserEmailService],
})
export class EmailModule {}
