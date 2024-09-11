import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaInstance } from 'src/infrastructure/database/prisma-instance.database';

@Injectable()
export class PrismaHealthCheckIndicator extends HealthIndicator {
  constructor(private readonly prismaInstance: PrismaInstance) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prismaInstance.$queryRaw`SELECT 1`;
      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError('Prisma Check Failed', error);
    }
  }
}
