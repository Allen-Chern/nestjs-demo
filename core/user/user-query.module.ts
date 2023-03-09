import { Module } from '@nestjs/common';
import { UserQueryRepo } from './repositories/user-query.repo';
import { QueryUserService } from './services/query-user';
import { UserFactoryModule } from './user-factory.module';

@Module({
  imports: [UserFactoryModule],
  providers: [UserQueryRepo, QueryUserService],
  exports: [QueryUserService],
})
export class UserQueryModule {}
