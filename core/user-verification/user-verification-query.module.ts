import { Module } from '@nestjs/common';
import { UserVerificationQueryRepo } from './repositories/user-verification-query.repo';
import { QueryUserVerificationService } from './services/query-user-verification';
import { UserVerificationFactoryModule } from './user-verification-factory.module';

@Module({
  imports: [UserVerificationFactoryModule],
  providers: [UserVerificationQueryRepo, QueryUserVerificationService],
  exports: [QueryUserVerificationService],
})
export class UserVerificationQueryModule {}
