import { IsNotEmpty, IsNumber } from 'class-validator';

export class TableDto {
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly min: number;

  @IsNumber()
  @IsNotEmpty()
  readonly max: number;
}
