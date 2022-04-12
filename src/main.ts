import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infrastructure';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(PORT || 3001, () =>
    Logger.log(`App started and listening on port ${PORT}`, 'MAIN'),
  );
}
bootstrap();
