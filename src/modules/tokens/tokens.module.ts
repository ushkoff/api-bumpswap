import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { TokensRepository } from './tokens.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  providers: [TokensService, TokensRepository],
  controllers: [TokensController],
  exports: [TokensRepository]
})
export class TokensModule {}
