import { Module } from '@nestjs/common';
import { UserVerificationMutateRepo } from './repositories/user-verification-mutate.repo';
import { CreateUserVerificationService } from './services/create-user-verification';
import { UserVerificationFactoryModule } from './user-verification-factory.module';

@Module({
  imports: [UserVerificationFactoryModule],
  providers: [UserVerificationMutateRepo, CreateUserVerificationService],
  exports: [CreateUserVerificationService],
})
export class UserVerificationCreateModule {}
