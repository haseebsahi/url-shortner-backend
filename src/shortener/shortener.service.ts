import { Injectable } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url-dto/create-short-url-dto';
import { ShortUrl } from './entities/short-url.entity/short-url.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShortenerService {
  private shortUrls: ShortUrl[] = [];

  shortenUrl(createShortUrlDto: CreateShortUrlDto): ShortUrl {
    const shortUrl: ShortUrl = {
      id: this.generateId(),
      originalUrl: createShortUrlDto.originalUrl,
      shortUrl: this.generateShortUrl(),
      clicks: 0,
      createdAt: new Date(),
    };
    this.shortUrls.push(shortUrl);
    return shortUrl;
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getAllUrls(): ShortUrl[] {
    return this.shortUrls;
  }

  findUrlByShortUrl(shortUrl: string): ShortUrl | undefined {
    return this.shortUrls.find((url) => url.shortUrl === shortUrl);
  }

  incrementClickCount(shortUrl: string): void {
    const url = this.findUrlByShortUrl(shortUrl);
    if (url) {
      url.clicks++;
    }
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
