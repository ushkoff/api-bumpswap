import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly symbol: string;

  @IsNotEmpty()
  @IsNumber()
  readonly totalSupply: string;
}
