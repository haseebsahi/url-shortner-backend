import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortUrlDto } from './dto/create-short-url-dto/create-short-url-dto';

@Controller('shortener')
export class ShortenerController {
    constructor(private readonly shortenerService: ShortenerService) {}

    @Post()
    async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto) {
        return this.shortenerService.shortenUrl(createShortUrlDto);
    }

    @Get(':shortUrl')
    // @Redirect()
    async redirectShortUrl(@Param('shortUrl') shortUrl: string) {
        console.log("get request received...")
        const urlObj = await this.shortenerService.findUrlByShortUrl(shortUrl);
        const originalUrl = urlObj?.originalUrl;
        console.log("originalUrl: ", originalUrl)
        if (originalUrl) {
            await this.shortenerService.incrementClickCount(shortUrl);
            return { url: originalUrl };
        }
        console.log("check 2")
        return { url: 'http://example.com/404' }; // Redirect to a 404 page or similar
    }
}
