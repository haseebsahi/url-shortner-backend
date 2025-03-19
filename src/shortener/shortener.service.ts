import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShortUrlDto } from './dto/create-short-url-dto/create-short-url-dto';
import { ShortUrl } from './schemas/short-url.schema';
import { RedisService } from 'src/services/redis.service';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrl>,
    private readonly redisService: RedisService,
  ) {}

  async shortenUrl(createShortUrlDto: CreateShortUrlDto): Promise<ShortUrl> {
    const shortUrl = new this.shortUrlModel({
      id: this.generateId(),
      originalUrl: createShortUrlDto.originalUrl,
      shortUrl: this.generateShortUrl(),
      clicks: 0,
      createdAt: new Date(),
    });
    return shortUrl.save();
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  async getAllUrls(): Promise<ShortUrl[]> {
    return this.shortUrlModel.find().exec();
  }

  async findUrlByShortUrl(shortUrl: string): Promise<ShortUrl | undefined> {
    // Check cache first
    const cachedUrl = await this.redisService.get(shortUrl);
    if (cachedUrl) {
      return this.shortUrlModel.hydrate(JSON.parse(cachedUrl));
    }

    // If not in cache, fetch from database
    const result = await this.shortUrlModel.findOne({ shortUrl }).exec();
    if (result) {
      // Cache the result
      await this.redisService.set(shortUrl, JSON.stringify(result), 3600); // Cache for 1 hour
    }
    return result || undefined;
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    const url = await this.findUrlByShortUrl(shortUrl);
    if (url) {
      url.clicks++;
      await url.save();
      // Update the cache
      await this.redisService.set(shortUrl, JSON.stringify(url), 3600); // Cache for 1 hour
    }
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
