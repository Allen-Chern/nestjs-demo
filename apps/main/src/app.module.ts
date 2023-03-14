import { AuthMiddleware } from '@@common/misc/auth-middleware';
import { GlobalModule } from '@@common/misc/global-module';
import { AuthModule } from '@@core/auth/auth.module';
import { LoginRecordModule } from '@@core/login-record/login-record.module';
import { EmailModule } from '@@core/misc/email/email.module';
import { HealthCheckModule } from '@@core/misc/health-check/health-check.module';
import { UserModule } from '@@core/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { configs } from './configs';
import { helpers } from './helpers';
import { dataSource } from './typeorm';

@Module({
  imports: [
    GlobalModule.forRoot([...configs, ...helpers, dataSource]),
    EventEmitterModule.forRoot(),
    HealthCheckModule,
    EmailModule,
    AuthModule,
    UserModule,
    LoginRecordModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
