import {
  CreateReservationConfigurationDto,
  TimeHelper,
  IRestaurant,
} from '@domain';
import {
  ReservationConfigurationTimeframeException,
  TimeFormatException,
} from '@exceptions';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidConfigurationTimeframeHandler extends AbstractHandler<CreateReservationConfigurationDto> {
  constructor(private readonly restaurant: IRestaurant) {
    super();
  }

  public handle(
    createReservationConfigurationDto: CreateReservationConfigurationDto,
  ): CreateReservationConfigurationDto {
    // eslint-disable-next-line prefer-const
    let { fromHour, toHour } = createReservationConfigurationDto;

    if (
      !TimeHelper.isValidTimeInMinutes(fromHour) ||
      !TimeHelper.isValidTimeInMinutes(toHour)
    )
      throw new TimeFormatException();

    if (
      !TimeHelper.isValidTimeFrameInMinutes(
        fromHour,
        toHour,
        this.restaurant.averageMealDuration,
      )
    ) {
      throw new ReservationConfigurationTimeframeException();
    }

    return super.handle(createReservationConfigurationDto);
  }
}
