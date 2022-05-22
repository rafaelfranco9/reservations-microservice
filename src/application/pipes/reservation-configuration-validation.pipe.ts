import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  ChainInitializer,
  CreateReservationConfigurationDto,
  IRestaurantService,
  RestaurantService,
  ValidConfigurationTimeframeHandler,
  ValidConfigurationWeekdaysHandler,
} from '@domain';

@Injectable()
export class ReservationConfigurationValidationPipe implements PipeTransform {
  constructor(
    @Inject(RestaurantService)
    private readonly restaurantService: IRestaurantService,
  ) {}

  async transform(
    reservationConfiguration: CreateReservationConfigurationDto,
    metadata: ArgumentMetadata,
  ) {
    const restaurant = await this.restaurantService.getOne(
      reservationConfiguration.restaurantId,
    );

    const validationChain =
      new ChainInitializer<CreateReservationConfigurationDto>();

    validationChain
      .setNext(new ValidConfigurationTimeframeHandler(restaurant))
      .setNext(new ValidConfigurationWeekdaysHandler());

    return validationChain.handle(reservationConfiguration);
  }
}
