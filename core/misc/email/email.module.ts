import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { UserEmailService } from './listeners/user';
import { Mailer } from './services/mailer';

@Module({
  providers: [MailerService, Mailer, UserEmailService],
})
export class EmailModule {}
