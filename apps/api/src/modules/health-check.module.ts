import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from 'src/controllers/health-check.controller';
import { PrismaHealthCheckIndicator } from 'src/services/health-check.service';

@Module({
  exports: [],
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  providers: [PrismaHealthCheckIndicator],
})
export class HealthCheckModule {}
