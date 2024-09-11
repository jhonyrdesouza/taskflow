import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from './modules/database.module';
import { HealthCheckModule } from './modules/health-check.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [DatabaseModule, HealthCheckModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
