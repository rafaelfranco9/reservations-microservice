import { Type } from 'class-transformer';
import {
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
  readonly capacity: TableGroupDto[];
}
