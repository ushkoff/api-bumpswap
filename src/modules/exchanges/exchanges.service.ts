import { Injectable } from '@nestjs/common';
import { Exchange } from './schemas';
import { AddLiquidityDto, CreateExchangeDto, GetAmountDto, MakeSwapDto } from './dto';
import { ExchangesRepository } from './exchanges.repository';
import { TokensRepository } from '../tokens/tokens.repository';
import { OrdersRepository } from '../orders';

@Injectable()
export class ExchangesService {
  constructor(
    private readonly exchangesRepository: ExchangesRepository,
    private readonly tokensRepository: TokensRepository,
    private readonly ordersRepository: OrdersRepository
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

    const res = this.exchangesRepository.addLiquidity(id, data);

    const order = await this.ordersRepository.findByExchangeId(id);
    console.log(order);
    if (order !== null) {
      if (order.isEthToToken === 1) {
        console.log('ETH -> Token');
        console.log('ETH amount: ', order.ethAmount);
        const minPrice = order.ethAmount * order.minPrice;
        console.log('Trade min price: ',minPrice + ' ' + order.tokenSymbol);

        const tokenAmount = await this.getTokenAmountSlippage(id, { amount: order.ethAmount });
        console.log('Price on exchange: ', tokenAmount.price + ' ' + order.tokenSymbol);

        if (typeof tokenAmount.price === 'number' && minPrice <= tokenAmount.price) {
          await this.ethToTokenSwap(id, {
            amount: order.ethAmount,
            ethId: '647fa0387d2d964dfc05d3f7',
            tokenId: order.tokenId
          });
          console.log('Order successfully traded!');

          // @ts-ignore
          await this.ordersRepository.delete(order._id);
        } else {
          console.log('Not enough liquidity to complete the order');
        }
      } else {
        console.log('Token -> ETH');
        console.log(order.tokenSymbol + ' amount: ', order.tokenAmount);
        const minPrice = order.tokenAmount * order.minPrice;
        console.log('Trade min price: ', minPrice + ' ETH');

        const ethAmount = await this.getEthAmountSlippage(id, { amount: order.tokenAmount });
        console.log('Price on exchange: ', ethAmount.price + ' ETH');

        if (typeof ethAmount.price === 'number' && minPrice <= ethAmount.price) {
          await this.tokenToEthSwap(id, {
            amount: order.ethAmount,
            ethId: '647fa0387d2d964dfc05d3f7',
            tokenId: order.tokenId
          });
          console.log('Order successfully traded!');

          // @ts-ignore
          await this.ordersRepository.delete(order._id);
        } else {
          console.log('Not enough liquidity to complete the order');
        }
      }
    }

    return res;
  }

  async getPrices(id: string): Promise<any> {
    return this.exchangesRepository.getPrices(id);
  }

  async getEthAmount(id: string, data: GetAmountDto) {
    return this.exchangesRepository.getEthAmount(id, data);
  }

  async getEthAmountSlippage(id: string, data: GetAmountDto) {
    return this.exchangesRepository.getEthAmountSlippage(id, data);
  }

  async getTokenAmount(id: string, data: GetAmountDto) {
    return this.exchangesRepository.getTokenAmount(id, data);
  }

  async getTokenAmountSlippage(id: string, data: GetAmountDto) {
    return this.exchangesRepository.getTokenAmountSlippage(id, data);
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
    this.tokensRepository.update(data.tokenId, { totalSupply: token.totalSupply - data.amount });
    const eth = await this.tokensRepository.getById(data.ethId);
    this.tokensRepository.update(data.ethId, { totalSupply: eth.totalSupply + Number(ethAmount) });

    return this.exchangesRepository.tokenToEthSwap(id, data, Number(ethAmount));
  }
}
