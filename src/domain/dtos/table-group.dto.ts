import { IsNotEmpty, IsNumber } from 'class-validator';

export class TableGroupDto {
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
