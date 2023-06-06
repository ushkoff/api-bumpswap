import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAmountDto {
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}
