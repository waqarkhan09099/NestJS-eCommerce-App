import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger/dist';


async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const docRelPath = 'swagger/api';
  const port = 4001;
  const host = 'localhost';
  const config = new DocumentBuilder()
    .setTitle('Company Name')
    .setDescription('Sub description of E-plateform nest app')
    .setVersion('1.0')
    .setBasePath('api')
    .addBasicAuth()
    .addBearerAuth()
    .addOAuth2()
    .addApiKey()
    .addApiKey({ type: 'apiKey' }, 'key1')
    .addApiKey({ type: 'apiKey' }, 'key2')
    .addCookieAuth()
    .addSecurityRequirements('bearer')
    .addSecurityRequirements({ basic: [], cookie: [] })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docRelPath, app, document);
  await app.listen(port, host);
  const baseUrl = `http://${host}:${port}`;
  const startMessage = `Server started at ${baseUrl}; SwaggerUI at ${
    baseUrl + '/' + docRelPath
  };`;

  Logger.log(startMessage);
}
bootstrap();
