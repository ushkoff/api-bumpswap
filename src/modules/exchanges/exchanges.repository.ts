import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exchange, ExchangeDocument } from './schemas';
import { Model } from 'mongoose';
import { AddLiquidityDto, CreateExchangeDto, GetAmountDto, MakeSwapDto } from './dto';

@Injectable()
export class ExchangesRepository {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>
  ) {}

  async getAll(): Promise<Exchange[]> {
    try {
      return await this.exchangeModel.find().lean().exec();
    } catch (error) {
      throw new Error('Failed to fetch exchanges.');
    }
  }

  async create(exchange: CreateExchangeDto): Promise<Exchange> {
    try {
      const newExchange = new this.exchangeModel(exchange);
      newExchange.ethBalance = 0;
      newExchange.tokenBalance = 0;
      newExchange.ethFeeReserve = 0;
      newExchange.tokenFeeReserve = 0;
      newExchange.LP_names = '';
      const savedExchange = await newExchange.save();
      return savedExchange.toObject();
    } catch (error) {
      throw new Error('Failed to create exchange.');
    }
  }

  async getById(id: string): Promise<Exchange> {
    try {
      const exchange = await this.exchangeModel.findById(id).lean().exec();

      if (!exchange) {
        throw new Error('Exchange not found');
      }

      return exchange;
    } catch (e) {
      throw new Error('Exchange not found');
    }
  }

  async addLiquidity(id: string, data: AddLiquidityDto) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      if (!exchange) {
        throw new Error('Exchange not found');
      }

      Object.assign(exchange, {
        LP_names: `[${data.LP_name}]`,
        ethBalance: exchange.ethBalance + data.ethAmount,
        tokenBalance: exchange.tokenBalance + data.tokenAmount,
      });
      const updatedExchange = await exchange.save();
      return updatedExchange.toObject();
    } catch (e) {
      throw new Error('Error at add liquidity');
    }
  }

  async getPrices(id: string) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        return {
          tokenPrice: -1,
          ethPrice: -1
        }
      }

      return {
        tokenPrice: tokenBalance / ethBalance,
        ethPrice: ethBalance / tokenBalance,
      };
    } catch (e) {
      throw new Error('Error at get prices');
    }
  }

  async getEthAmount(id: string, data: GetAmountDto) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        return {
          tokenPrice: -1,
          ethPrice: -1
        }
      }

      return (data.amount * ethBalance) / (tokenBalance + data.amount);
    } catch (e) {
      throw new Error('Error at get amount');
    }
  }

  async getEthAmountSlippage(id: string, data: GetAmountDto) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        return {
          tokenPrice: -1,
          ethPrice: -1
        }
      }

      const priceInTokens = (data.amount * ethBalance) / (tokenBalance + data.amount)

      return {
        price: priceInTokens,
        slippage: (ethBalance / tokenBalance) * data.amount - priceInTokens
      };
    } catch (e) {
      throw new Error('Error at get amount');
    }
  }

  async getTokenAmount(id: string, data: GetAmountDto) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        return {
          tokenPrice: -1,
          ethPrice: -1
        }
      }

      return (data.amount * tokenBalance) / (ethBalance + data.amount);
    } catch (e) {
      throw new Error('Error at get amount');
    }
  }

  async getTokenAmountSlippage(id: string, data: GetAmountDto) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        return {
          tokenPrice: -1,
          ethPrice: -1
        }
      }

      const priceInEths = (data.amount * tokenBalance) / (ethBalance + data.amount)

      return {
        price: priceInEths,
        slippage: (tokenBalance / ethBalance) * data.amount - priceInEths
      };
    } catch (e) {
      throw new Error('Error at get amount');
    }
  }

  async ethToTokenSwap(id: string, data: MakeSwapDto, tokenAmount: number) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        throw new Error('Error at make trade: reserves are empty');
      }

      Object.assign(exchange, {
        ethBalance: exchange.ethBalance + data.amount,
        tokenBalance: exchange.tokenBalance - tokenAmount,
      });
      const updatedExchange = await exchange.save();
      return updatedExchange.toObject();
    } catch (e) {
      throw new Error('Error at make trade');
    }
  }

  async tokenToEthSwap(id: string, data: MakeSwapDto, ethAmount: number) {
    try {
      const exchange = await this.exchangeModel.findById(id);

      const tokenBalance = exchange.tokenBalance;
      const ethBalance = exchange.ethBalance;

      if (tokenBalance === 0 || ethBalance === 0) {
        throw new Error('Error at make trade: reserves are empty');
      }

      Object.assign(exchange, {
        ethBalance: exchange.ethBalance - ethAmount,
        tokenBalance: exchange.tokenBalance + data.amount,
      });
      const updatedExchange = await exchange.save();
      return updatedExchange.toObject();
    } catch (e) {
      throw new Error('Error at make trade');
    }
  }
}
