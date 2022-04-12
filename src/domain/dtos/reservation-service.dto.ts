import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { WeekdaysDto } from './weekdays.dto';

export class CreateReservationServiceDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly restaurantId: string;

  @IsDefined()
  @IsBoolean()
  @IsNotEmpty()
  readonly isActive: boolean;

  @IsDefined()
  @IsObject()
  @Type(() => WeekdaysDto)
  readonly weekdays: WeekdaysDto;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly fromHour: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly toHour: number;

  @IsDefined()
  @IsString({ each: true })
  readonly inactiveDates: string;
}

export class UpdateReservationServiceDto extends PartialType(
  CreateReservationServiceDto,
) {}
