// filepath: d:\url-shortner-backend\src\shortener\entities\short-url.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShortUrl extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortUrl: string;

  @Prop({ required: true })
  declare id: string;

  @Prop({ default: 0 })
  clicks: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
