import { Injectable } from '@nestjs/common';
import { TokensRepository } from './tokens.repository';
import { Token } from './schemas';
import { CreateTokenDto, UpdateTokenDto } from './dto';

@Injectable()
export class TokensService {
  constructor(private readonly tokensRepository: TokensRepository) {}

  async getTokens(): Promise<Token[]> {
    return this.tokensRepository.getAll();
  }

  async createToken(data: CreateTokenDto): Promise<Token> {
    return this.tokensRepository.create(data);
  }

  async updateToken(id: string, data: UpdateTokenDto): Promise<Token> {
    return this.tokensRepository.update(id, data);
  }
}
