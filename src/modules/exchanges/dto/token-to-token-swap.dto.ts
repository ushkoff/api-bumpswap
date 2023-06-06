import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenToTokenSwapDto {
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly token1_id: string;

  @IsNotEmpty()
  @IsString()
  readonly token2_id: string;

  @IsNotEmpty()
  @IsString()
  readonly ethId: string;
}
