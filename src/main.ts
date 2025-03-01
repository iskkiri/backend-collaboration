import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Server');
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get<number>('PORT') || 8080;

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(PORT, () => logger.log(`${PORT}번 포트에서 서버 실행 중  ✅ `));
}
bootstrap();
