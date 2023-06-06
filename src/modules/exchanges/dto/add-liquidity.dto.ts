import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddLiquidityDto {
  @IsNotEmpty()
  @IsString()
  readonly LP_name: string;

  @IsNotEmpty()
  @IsString()
  readonly tokenId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly tokenAmount: number;

  @IsNotEmpty()
  @IsString()
  readonly ethId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly ethAmount: number;
}
