import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TableGroupDto } from './table-group.dto';

export class AreaDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  @IsObject({ each: true })
  @Type(() => TableGroupDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  readonly capacity: TableGroupDto[];
}
