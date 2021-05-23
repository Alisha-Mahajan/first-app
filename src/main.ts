import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>('COOKIE_SECRET');
  const allowedCorsOrigins = configService.get<Array<string>>(
    'CORS_ALLOWED_ORIGINS',
  );

  app.enableCors({
    origin: allowedCorsOrigins?.length ? allowedCorsOrigins : '*',
  });

  app.use(cookieParser(cookieSecret));

  const config = new DocumentBuilder()
    .setTitle('My first app')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('app')
    .build();

  /**
   * if you want to make sure that the library generates operation names like createUser instead of UserController_createUser,
   *  you can set the following:
   * options is optional property
   */
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
