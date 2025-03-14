import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', 
    // Allow specific origin methods: 'GET,POST', 
    // Allow specific methods allowedHeaders: 'Content-Type, Authorization', 
    // Allow specific headers 
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
