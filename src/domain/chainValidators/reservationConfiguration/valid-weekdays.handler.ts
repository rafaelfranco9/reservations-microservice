import { AbstractHandler } from '../abstract-handler.abstract';
import {
  CreateReservationConfigurationDto,
  ReservationConfigurationWeekdaysException,
} from '@domain';

export class ValidConfigurationWeekdaysHandler extends AbstractHandler<CreateReservationConfigurationDto> {
  constructor() {
    super();
  }

  public handle(
    createReservationConfigurationDto: CreateReservationConfigurationDto,
  ): CreateReservationConfigurationDto {
    const { weekdays } = createReservationConfigurationDto;
    const atLeastOneWeekdayActive =
      weekdays.monday ||
      weekdays.tuesday ||
      weekdays.wednesday ||
      weekdays.thursday ||
      weekdays.friday ||
      weekdays.saturday ||
      weekdays.sunday;

    if (!atLeastOneWeekdayActive)
      throw new ReservationConfigurationWeekdaysException();

    return super.handle(createReservationConfigurationDto);
  }
}
