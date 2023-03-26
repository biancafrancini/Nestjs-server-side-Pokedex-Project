import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // to avoid blocked requestes by CORS policy
  await app.listen(3001); // server is listening at port 3001
}
bootstrap();
