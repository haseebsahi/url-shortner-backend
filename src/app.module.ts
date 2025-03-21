import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/url-shortener'),
    ShortenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
