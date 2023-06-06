import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExchangeDto {
  @IsNotEmpty()
  @IsString()
  readonly tokenId: string;

  @IsNotEmpty()
  @IsString()
  readonly tokenSymbol: string;

  @IsNotEmpty()
  @IsNumber()
  readonly feePercentage: number;
}
