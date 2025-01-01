import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // อนุญาตเฉพาะ Frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // HTTP Methods ที่อนุญาต
    credentials: true, // หากต้องการส่ง Cookies หรือ Headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
