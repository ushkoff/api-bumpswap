import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from './schemas';
import { ExchangesService } from './exchanges.service';
import { ExchangesRepository } from './exchanges.repository';
import { ExchangesController } from './exchanges.controller';
import { TokensRepository } from '../tokens/tokens.repository';
import { Token, TokenSchema } from '../tokens/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Exchange.name, schema: ExchangeSchema }]), MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  providers: [ExchangesService, ExchangesRepository, TokensRepository],
  controllers: [ExchangesController],
  exports: [ExchangesRepository]
})
export class ExchangesModule {}
