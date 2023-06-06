import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schemas';
import { Model } from 'mongoose';
import { CreateTokenDto, UpdateTokenDto } from "./dto";

@Injectable()
export class TokensRepository {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async getAll(): Promise<Token[]> {
    try {
      return await this.tokenModel.find().lean().exec();
    } catch (error) {
      throw new Error('Failed to fetch tokens.');
    }
  }

  async create(token: CreateTokenDto): Promise<Token> {
    try {
      const newToken = new this.tokenModel(token);
      const savedToken = await newToken.save();
      return savedToken.toObject();
    } catch (error) {
      throw new Error('Failed to create token.');
    }
  }

  async update(id: string, data: UpdateTokenDto): Promise<Token> {
    try {
      const token = await this.tokenModel.findById(id);

      if (!token) {
        throw new Error('Token not found');
      }

      Object.assign(token, data);
      const updatedToken = await token.save();
      return updatedToken.toObject();
    } catch (error) {
      throw new Error('Failed to update token');
    }
  }
}
