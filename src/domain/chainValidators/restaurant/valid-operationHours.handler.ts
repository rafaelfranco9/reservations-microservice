import { ONE_DAY_IN_MINUTES, TimeHelper, CreateRestaurantDto } from '@domain';
import {
  RestaurantOperationHoursException,
  TimeFormatException,
} from '@exceptions';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidOperationHoursHandler extends AbstractHandler<CreateRestaurantDto> {
  constructor() {
    super();
  }

  public handle(createRestaurantDto: CreateRestaurantDto): CreateRestaurantDto {
    // eslint-disable-next-line prefer-const
    let { openHour, closeHour, averageMealDuration } = createRestaurantDto;

    if (
      !TimeHelper.isValidTimeInMinutes(openHour) ||
      !TimeHelper.isValidTimeInMinutes(closeHour)
    )
      throw new TimeFormatException();

    let hasDayOverflow = false;

    while (closeHour >= ONE_DAY_IN_MINUTES) {
      hasDayOverflow = true;
      closeHour -= ONE_DAY_IN_MINUTES;
    }

    if (hasDayOverflow) {
      if (closeHour <= openHour) {
        return super.handle(createRestaurantDto);
      }
    } else {
      if (closeHour > openHour && closeHour - openHour >= averageMealDuration) {
        return super.handle(createRestaurantDto);
      }
    }

    throw new RestaurantOperationHoursException(hasDayOverflow);
  }
}
