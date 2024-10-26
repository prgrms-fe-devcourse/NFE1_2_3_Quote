import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  //NestExpressApplication이라고 타입을 지정해야 useStaticAssets()를 사용할 수 있음.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //파이프를 글로벌로 설정해서 모든 요청에 대해 유효성 검사를 수행.
  app.useGlobalPipes(new ValidationPipe());
  //예외 필터를 글로벌로 설정해서 모든 예외에 대해 처리.
  app.useGlobalFilters(new HttpExceptionFilter());
  //express-basic-auth 미들웨어를 사용해서 /docs, /docs-json 경로에 대해 인증을 수행.
  app.use(
    ['/docs', 'docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  //express.static()을 사용해서 /media 경로에 파일을 노출.
  //http://localhost:8000/media/파일명.확장자 로 접근 가능.
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    //서버의 파일 구조를 숨기기 위해 common/uploads경로 대신, /media 경로로 접근 가능하도록 설정.
    prefix: '/media',
  });
  //SwaggerModule.createDocument()를 사용해서 API 문서를 생성.
  const config = new DocumentBuilder()
    .setTitle('project_api')
    .setDescription('3rd_project_api')
    .setVersion('1.0.0')
    .addTag('cats')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Input your JWT token',
        name: 'Authorization',
        in: 'header',
      },
      'bearer',
    )
    .build();
  //SwaggerModule.setup()을 사용해서 /docs 경로에 API 문서를 노출.
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('docs', app, documentFactory, customOptions);
  //CORS 설정
  app.enableCors({ origin: true, credentials: true });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
