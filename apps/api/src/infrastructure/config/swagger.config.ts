import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Taskflow - Teste Técnico para Zenvia')
    .setDescription('Documentação do sistema de gerenciamento de tarefas')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
