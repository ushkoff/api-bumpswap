import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema({
  collection: 'tokens',
  timestamps: true
})
export class Token {
  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  totalSupply: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
