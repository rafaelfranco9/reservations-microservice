import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infrastructure';
import { ConfigService } from '@nestjs/config';
import { TimeHelper } from '@domain';
import { TypeORMExceptionFilter } from '@application';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get('APP_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new TypeORMExceptionFilter());

  await app.listen(PORT || 3001, () =>
    Logger.log(`App started and listening on port ${PORT}`, 'MAIN'),
  );
}
bootstrap();
