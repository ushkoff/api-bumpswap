import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  collection: 'orders',
  timestamps: true
})
export class Order {
  @Prop()
  tokenId: string;

  @Prop()
  tokenSymbol: string;

  @Prop()
  tokenAmount: number;

  @Prop()
  ehtId: string;

  @Prop()
  ethAmount: number;

  @Prop()
  exchangeId: string;

  @Prop()
  isEthToToken: number;

  @Prop()
  minPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
