import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MakeSwapDto {
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly tokenId: string;

  @IsNotEmpty()
  @IsString()
  readonly ethId: string;
}
