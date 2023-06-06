import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExchangeDocument = Exchange & Document;

@Schema({
  collection: 'exchanges',
  timestamps: true
})
export class Exchange {
  @Prop()
  tokenId: string;

  @Prop()
  tokenSymbol: string;

  @Prop()
  ethBalance: number;

  @Prop()
  tokenBalance: number;

  @Prop()
  feePercentage: number;

  @Prop()
  ethFeeReserve: number;

  @Prop()
  tokenFeeReserve: number;

  @Prop()
  LP_names: string;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
