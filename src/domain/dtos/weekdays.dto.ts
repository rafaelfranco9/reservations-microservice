import { IsBoolean, IsDefined } from 'class-validator';

export class WeekdaysDto {
  @IsDefined()
  @IsBoolean()
  readonly monday: boolean;

  @IsDefined()
  @IsBoolean()
  readonly tuesday: boolean;

  @IsDefined()
  @IsBoolean()
  readonly wednesday: boolean;

  @IsDefined()
  @IsBoolean()
  readonly thursday: boolean;

  @IsDefined()
  @IsBoolean()
  readonly friday: boolean;

  @IsDefined()
  @IsBoolean()
  readonly saturday: boolean;

  @IsDefined()
  @IsBoolean()
  readonly sunday: boolean;
}
