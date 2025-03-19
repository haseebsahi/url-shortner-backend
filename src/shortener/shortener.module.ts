import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlSchema } from './schemas/short-url.schema';
import { RedisService } from 'src/services/redis.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
    ]),
  ],
  controllers: [ShortenerController],
  providers: [ShortenerService, RedisService, ConfigService],
})
export class ShortenerModule {}
