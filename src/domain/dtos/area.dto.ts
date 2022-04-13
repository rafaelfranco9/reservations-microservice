import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TableDto } from './tables.dto';

export class AreaDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsObject({ each: true })
  @Type(() => TableDto)
  @ValidateNested({ each: true })
  readonly capacity: TableDto[];
}
