import { UserCreateModule } from '@@core/user/user-create.module';
import { UserQueryModule } from '@@core/user/user-query.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AccessJwt } from './services/access-jwt';
import { AuthService } from './services/auth';
import { FacebookStrategy } from './services/facebook-strategy';
import { GoogleStrategy } from './services/google-strategy';
import { TokenManager } from './services/token-manager';

@Module({
  imports: [UserQueryModule, UserCreateModule],
  providers: [AccessJwt, TokenManager, AuthService, FacebookStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
