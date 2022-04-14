import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly restaurantId: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly customer: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly fromHour: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly toHour: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly partySize: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly areaId: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly tablesId: number;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
