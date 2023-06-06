import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: true
})
export class User {
  @Prop()
  name: string;

  @Prop()
  LP_tokens: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
