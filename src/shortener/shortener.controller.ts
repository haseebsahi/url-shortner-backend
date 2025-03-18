import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortUrlDto } from './dto/create-short-url-dto/create-short-url-dto';
import { ShortUrl } from './entities/short-url.entity/short-url.entity';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('shorten')
  async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.shortenerService.shortenUrl(createShortUrlDto);
  }

  @Get('list')
  async getAllUrls(): Promise<ShortUrl[]> {
    return await this.shortenerService.getAllUrls();
  }

  @Get('original/:shortId')
  async getOriginal(@Param('shortId') shortUrl: string) {
    const urlObj = await this.shortenerService.findUrlByShortUrl(shortUrl);
    return { url: urlObj?.originalUrl };
  }

  @Get('analytics/:shortId')
  async getAnalytics(@Param('shortId') shortUrl: string) {
    const urlObj = await this.shortenerService.findUrlByShortUrl(shortUrl);
    return urlObj?.clicks ?? 0;
  }

  @Get(':shortId')
  @Redirect()
  async redirectShortUrl(@Param('shortId') shortUrl: string) {
    const urlObj = await this.shortenerService.findUrlByShortUrl(shortUrl);
    const originalUrl = urlObj?.originalUrl;
    if (originalUrl) {
      await this.shortenerService.incrementClickCount(shortUrl);
      return { url: originalUrl };
    }
    return { url: 'http://example.com/404' }; // Redirect to a 404 page or similar
  }
}
