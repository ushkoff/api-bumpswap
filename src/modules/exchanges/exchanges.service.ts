import { Injectable } from '@nestjs/common';
import { Exchange } from './schemas';
import { AddLiquidityDto, CreateExchangeDto, GetAmountDto, MakeSwapDto, TokenToTokenSwapDto } from './dto';
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

  async ethToTokenSwap(id: string, data: MakeSwapDto): Promise<Exchange> {
    const tokenAmount = await this.exchangesRepository.getTokenAmount(id, { amount: data.amount });

    const token = await this.tokensRepository.getById(data.tokenId);
    this.tokensRepository.update(data.tokenId, { totalSupply: token.totalSupply + Number(tokenAmount) });
    const eth = await this.tokensRepository.getById(data.ethId);
    this.tokensRepository.update(data.ethId, { totalSupply: eth.totalSupply - data.amount });

    return this.exchangesRepository.ethToTokenSwap(id, data, Number(tokenAmount));
  }

  async tokenToEthSwap(id: string, data: MakeSwapDto): Promise<Exchange> {
    const ethAmount = await this.exchangesRepository.getEthAmount(id, { amount: data.amount });

    const token = await this.tokensRepository.getById(data.tokenId);
    await this.tokensRepository.update(data.tokenId, { totalSupply: token.totalSupply - data.amount });
    const eth = await this.tokensRepository.getById(data.ethId);
    await this.tokensRepository.update(data.ethId, { totalSupply: eth.totalSupply + Number(ethAmount) });

    return this.exchangesRepository.tokenToEthSwap(id, data, Number(ethAmount));
  }

  async tokenToTokenSwap(id: string, data: TokenToTokenSwapDto): Promise<Exchange> {
    const trade1 = await this.tokenToEthSwap(id, { amount: data.amount, tokenId: data.token1_id, ethId: data.ethId });
    const ethAmount = await this.getEthAmount(id, { amount: data.amount });
    console.log(trade1)
    console.log(ethAmount);
    const trade2 = await this.ethToTokenSwap(id, { amount: Number(ethAmount), ethId: data.ethId, tokenId: data.token2_id });
    const tokenAmount = await this.getTokenAmount(id, { amount: Number(ethAmount) });
    console.log(trade2);
    console.log(tokenAmount);

    const token1 = await this.tokensRepository.getById(data.token1_id);
    await this.tokensRepository.update(data.token1_id, { totalSupply: token1.totalSupply - data.amount });
    const token2 = await this.tokensRepository.getById(data.token2_id);
    await this.tokensRepository.update(data.token1_id, { totalSupply: token2.totalSupply + Number(tokenAmount) });

    return trade2;
  }
}
