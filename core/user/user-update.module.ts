import { Module } from '@nestjs/common';
import { UserMutateRepo } from './repositories/user-mutate.repo';
import { UpdateUserService } from './services/update-user';
import { UserFactoryModule } from './user-factory.module';

@Module({
  imports: [UserFactoryModule],
  providers: [UserMutateRepo, UpdateUserService],
  exports: [UpdateUserService],
})
export class UserUpdateModule {}
