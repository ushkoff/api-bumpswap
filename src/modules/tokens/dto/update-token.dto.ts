import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTokenDto {
  @IsNotEmpty()
  @IsNumber()
  readonly totalSupply: string;
}
