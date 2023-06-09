import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Request, Param
} from '@nestjs/common';

import { CreateExchangeDto, AddLiquidityDto, GetAmountDto, MakeSwapDto } from './dto';
import { ExchangesService } from './exchanges.service';
import { Exchange } from './schemas';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@Request() req): Promise<Exchange[]> {
    return this.exchangesService.getExchanges();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateExchangeDto): Promise<Exchange> {
    return this.exchangesService.createExchange(body);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string
  ): Promise<Exchange> {
    return this.exchangesService.getExchange(id);
  }

  @Post('/add-liquidity/:id')
  @HttpCode(HttpStatus.OK)
  async addLiquidity(
    @Param('id') id: string,
    @Body() body: AddLiquidityDto
  ): Promise<Exchange> {
    return this.exchangesService.addLiquidity(id, body);
  }

  @Get('/prices/:id')
  @HttpCode(HttpStatus.OK)
  async getPrices(
    @Param('id') id: string
  ): Promise<any> {
    return this.exchangesService.getPrices(id);
  }

  @Get('/eth-amount/:id')
  @HttpCode(HttpStatus.OK)
  async getEthAmount(
    @Param('id') id: string,
    @Body() body: GetAmountDto
  ): Promise<any> {
    return this.exchangesService.getEthAmount(id, body);
  }

  @Post('/eth-amount/slippage/:id')
  @HttpCode(HttpStatus.OK)
  async getEthAmountSlippage(
    @Param('id') id: string,
    @Body() body: GetAmountDto
  ): Promise<any> {
    return this.exchangesService.getEthAmountSlippage(id, body);
  }

  @Get('/token-amount/:id')
  @HttpCode(HttpStatus.OK)
  async getTokenAmount(
    @Param('id') id: string,
    @Body() body: GetAmountDto
  ): Promise<any> {
    return this.exchangesService.getTokenAmount(id, body);
  }

  @Post('/token-amount/slippage/:id')
  @HttpCode(HttpStatus.OK)
  async getTokenAmountSlippage(
    @Param('id') id: string,
    @Body() body: GetAmountDto
  ): Promise<any> {
    return this.exchangesService.getTokenAmountSlippage(id, body);
  }

  @Post('/eth-to-token/:id')
  @HttpCode(HttpStatus.OK)
  async ethToTokenSwap(
    @Param('id') id: string,
    @Body() body: MakeSwapDto
  ): Promise<Exchange> {
    return this.exchangesService.ethToTokenSwap(id, body);
  }

  @Post('/token-to-eth/:id')
  @HttpCode(HttpStatus.OK)
  async tokenToEthSwap(
    @Param('id') id: string,
    @Body() body: MakeSwapDto
  ): Promise<Exchange> {
    return this.exchangesService.tokenToEthSwap(id, body);
  }
}
