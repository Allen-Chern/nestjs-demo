import { GlobalModule } from '@@common/misc/global-module';
import { AuthModule } from '@@core/auth/auth.module';
import { LoginRecordModule } from '@@core/login-record/login-record.module';
import { EmailModule } from '@@core/misc/email/email.module';
import { HealthCheckModule } from '@@core/misc/health-check/health-check.module';
import { UserModule } from '@@core/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configs } from './configs';
import { mailConfig } from './email';
import { helpers } from './helpers';
import { dataSource } from './typeorm';

@Module({
  imports: [
    GlobalModule.forRoot([...configs, ...helpers, dataSource]),
    EventEmitterModule.forRoot(),
    MailerModule.forRootAsync(mailConfig),
    HealthCheckModule,
    AuthModule,
    UserModule,
    LoginRecordModule,
    EmailModule,
  ],
})
export class AppModule {}
