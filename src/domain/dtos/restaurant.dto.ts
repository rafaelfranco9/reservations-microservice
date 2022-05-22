import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { AreaDto } from './area.dto';
import {
  IsString,
  IsNumber,
  IsObject,
  IsNotEmpty,
  IsDefined,
  ValidateNested,
  ArrayMinSize,
  IsPositive,
} from 'class-validator';

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
  @IsPositive()
  readonly averageMealDuration: number;

  @IsDefined()
  @IsObject({ each: true })
  @Type(() => AreaDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  readonly areas: AreaDto[];
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {}
