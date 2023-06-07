import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  readonly tokenId: string;

  @IsNotEmpty()
  @IsString()
  tokenSymbol: string;

  @IsNotEmpty()
  @IsString()
  readonly ethId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly tokenAmount: number;

  @IsNotEmpty()
  @IsNumber()
  readonly ethAmount: number;

  @IsNotEmpty()
  @IsString()
  readonly exchangeId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly isEthToToken: number;

  @IsNotEmpty()
  @IsNumber()
  readonly minPrice: number;
}
