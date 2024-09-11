import { Global, Module } from '@nestjs/common';
import { PrismaInstance } from 'src/infrastructure/database/prisma-instance.database';

@Global()
@Module({
  providers: [PrismaInstance],
  exports: [PrismaInstance],
})
export class DatabaseModule {}
