export class ShortUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;

  constructor(originalUrl: string, shortUrl: string, id: string) {
    this.id = id
    this.originalUrl = originalUrl;
    this.shortUrl = shortUrl;
    this.clicks = 0;
    this.createdAt = new Date();
  }
}