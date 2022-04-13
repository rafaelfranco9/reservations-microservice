import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsObject,
  IsNotEmpty,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { AreaDto } from './area.dto';

export class CreateRestaurantDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly openHour: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly closeHour: number;

  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  readonly averageMealDuration: number;

  @IsDefined()
  @IsObject({ each: true })
  @Type(() => AreaDto)
  @ValidateNested({ each: true })
  readonly areas: AreaDto[];
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
