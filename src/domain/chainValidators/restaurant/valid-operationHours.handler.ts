import { TimeHelper, CreateRestaurantDto } from '@domain';
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

    if (
      !TimeHelper.isValidTimeFrameInMinutes(
        openHour,
        closeHour,
        averageMealDuration,
      )
    ) {
      throw new RestaurantOperationHoursException();
    }

    return super.handle(createRestaurantDto);
  }
}
