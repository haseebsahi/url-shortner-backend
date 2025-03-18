// filepath: d:\url-shortner-backend\src\shortener\shortener.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShortUrlDto } from './dto/create-short-url-dto/create-short-url-dto';
import { ShortUrl } from './schemas/short-url.schema';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectModel(ShortUrl.name) private shortUrlModel: Model<ShortUrl>,
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
    const result = await this.shortUrlModel.findOne({ shortUrl }).exec();
    return result || undefined;
  }

  async incrementClickCount(shortUrl: string): Promise<void> {
    const url = await this.findUrlByShortUrl(shortUrl);
    if (url) {
      url.clicks++;
      await url.save();
    }
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
