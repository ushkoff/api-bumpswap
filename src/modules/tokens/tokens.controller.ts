import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Request,
  Put,
  Param,
} from '@nestjs/common';

import { CreateTokenDto, UpdateTokenDto } from './dto';
import { TokensService } from './tokens.service';
import { Token } from './schemas';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@Request() req): Promise<Token[]> {
    return this.tokensService.getTokens();
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTokenDto): Promise<Token> {
    return this.tokensService.createToken(body);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTokenDto,
  ): Promise<Token> {
    return this.tokensService.updateToken(id, body);
  }
}
