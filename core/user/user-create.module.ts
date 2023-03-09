import { Module } from '@nestjs/common';
import { UserMutateRepo } from './repositories/user-mutate.repo';
import { CreateUserService } from './services/create-user';
import { UserFactoryModule } from './user-factory.module';

@Module({
  imports: [UserFactoryModule],
  providers: [UserMutateRepo, CreateUserService],
  exports: [CreateUserService],
})
export class UserCreateModule {}
