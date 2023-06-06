import { Injectable } from '@nestjs/common';
import { Exchange } from './schemas';
import { AddLiquidityDto, CreateExchangeDto, GetAmountDto } from './dto';
import { ExchangesRepository } from './exchanges.repository';
import { TokensRepository } from '../tokens/tokens.repository';

@Injectable()
export class ExchangesService {
  constructor(
    private readonly exchangesRepository: ExchangesRepository,
    private readonly tokensRepository: TokensRepository
  ) {
  }

  async getExchanges(): Promise<Exchange[]> {
    return this.exchangesRepository.getAll();
  }

  async createExchange(data: CreateExchangeDto): Promise<Exchange> {
    return this.exchangesRepository.create(data);
  }

  async getExchange(id: string): Promise<Exchange> {
    return this.exchangesRepository.getById(id);
  }

  async addLiquidity(id: string, data: AddLiquidityDto): Promise<Exchange> {
    const token = await this.tokensRepository.getById(data.tokenId);
    this.tokensRepository.update(data.tokenId, { totalSupply: token.totalSupply - data.tokenAmount });
    const eth = await this.tokensRepository.getById(data.ethId);
    this.tokensRepository.update(data.ethId, { totalSupply: eth.totalSupply - data.ethAmount });
    return this.exchangesRepository.addLiquidity(id, data);
  }

  async getPrices(id: string): Promise<any> {
    return this.exchangesRepository.getPrices(id);
  }

  async getEthAmount(id: string, data: GetAmountDto) {
    return this.exchangesRepository.getEthAmount(id, data);
  }

  async getTokenAmount(id: string, data: GetAmountDto) {
    return this.exchangesRepository.getTokenAmount(id, data);
  }
}
