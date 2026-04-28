/// <reference types="node" />
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 Habilita CORS com configurações seguras para desenvolvimento
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 🛡️ Validação global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 🚀 Porta e host
  const port = parseInt(process.env.PORT || '4000', 10);
  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);

  console.log(`✅ API DeliraAteliê rodando`);
  console.log(`🔗 http://localhost:${port}`);
}
bootstrap();