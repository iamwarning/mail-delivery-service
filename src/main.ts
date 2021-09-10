import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptor/timeout/timeout.interceptor';
import { LoggerInterceptor } from './common/interceptor/logger/logger.interceptor';
import { HttpExceptionFilter } from './common/filter/http/http-exception.filter';
import { Logger, RequestMethod, VersioningType } from '@nestjs/common';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 6520;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.setGlobalPrefix('/api/v1/', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();
  app.enableVersioning({ type: VersioningType.MEDIA_TYPE, key: 'v=1' });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor(), new LoggerInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Mail delivery service')
    .setDescription('Mail delivery service')
    .setVersion('1.0.0')
    .setTermsOfService('https://jorgel.io/terms-of-service')
    .setContact('Jorge L', 'https://jorgel.io/', 'siul.gomez94@gmail.com')
    .setLicense('MIT', 'https://mit')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, { customSiteTitle: 'DEmo' });
  await app.listen(PORT, () =>
    Logger.log(`Mail delivery service is listening: [${PORT}]`, 'Main'),
  );
}
(async () => {
  await bootstrap();
})();
