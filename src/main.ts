import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('PSP')
    .setDescription('PSP API - Test')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT);

  Logger.log(`Server : ${process.env.APP_URL}:${process.env.APP_PORT}`);
  Logger.log(`Docs   : http://${process.env.APP_URL}:${process.env.APP_PORT}/docs`);
}

bootstrap();
