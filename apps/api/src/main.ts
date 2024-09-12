import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './helpers/filters/http-expection.filter';
import { LoggingInterceptor } from './helpers/interceptors/logging.interceptor';
import { options } from './helpers/pipes/validation-options.pipe';
import { swaggerConfig } from './infrastructure/config/swagger.config';
import { ApplicationModule } from './modules/application.module';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule, {
    rawBody: true,
    logger: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['debug', 'log', 'verbose'],
    cors: {
      origin: [`${process.env.FRONTEND_ENDPOINT}`],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
    },
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe(options));

  swaggerConfig(app);

  await app.listen(process.env.PORT, () =>
    logger.log(`Server is running on port ${process.env.PORT} and running on mode ${process.env.NODE_ENV}`),
  );
}

bootstrap();
