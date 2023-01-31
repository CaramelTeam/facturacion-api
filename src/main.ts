import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envsConfig from './config/envs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  
  await app.listen(envsConfig().app.PORT);
}
bootstrap();
