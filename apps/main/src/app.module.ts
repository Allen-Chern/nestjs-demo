import { GlobalModule } from '@@common/misc/global-module';
import { HealthCheckModule } from '@@core/misc/health-check/health-check.module';
import { Module } from '@nestjs/common';
import { configs } from './configs';
import { helpers } from './helpers';
import { dataSource } from './typeorm';

@Module({
  imports: [GlobalModule.forRoot([...configs, ...helpers, dataSource]), HealthCheckModule],
})
export class AppModule {}
