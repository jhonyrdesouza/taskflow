import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './application.module';
import { swaggerConfig } from './infrastructure/config/swagger.config';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, {
    rawBody: true,
    logger: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['debug', 'log', 'verbose'],
    cors: {
      origin: ['http://localhost:3001'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    },
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });

  // app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalPipes(new ValidationPipe(validationOptions));

  swaggerConfig(app);

  await app.listen(process.env.PORT, () =>
    logger.log(`Server is running on port ${process.env.PORT} and running on mode ${process.env.NODE_ENV}`),
  );
}

bootstrap();
