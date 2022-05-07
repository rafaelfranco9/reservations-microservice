import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  CreateReservationDto,
  IReservationService,
  IRestaurantService,
  ReservationService,
  ReservationSlotException,
  RestaurantService,
  TimeFrame,
  ChainInitializer,
  ValidAreaHandler,
  ValidDateHandler,
  ValidPartySizeHandler,
  ValidTableHandler,
  ValidTimeframeHandler,
  ReservationConfigurationService,
  IReservationConfigurationService,
} from '@domain';

@Injectable()
export class ReservationValidationPipe implements PipeTransform {
  constructor(
    @Inject(ReservationService)
    private readonly reservationService: IReservationService,
    @Inject(RestaurantService)
    private readonly restaurantService: IRestaurantService,
    @Inject(ReservationConfigurationService)
    private readonly reservationConfigurationService: IReservationConfigurationService,
  ) {}

  async transform(
    reservation: CreateReservationDto,
    metadata: ArgumentMetadata,
  ) {
    const { areaId, tablesId, restaurantId } = reservation;
    const restaurant = await this.restaurantService.getOne(restaurantId);
    const configuration =
      await this.reservationConfigurationService.getByRestaurantId(
        restaurantId,
      );

    const validationChain = new ChainInitializer<CreateReservationDto>();
    validationChain
      .setNext(new ValidDateHandler(configuration))
      .setNext(new ValidTimeframeHandler(restaurant, configuration))
      .setNext(new ValidAreaHandler(restaurant))
      .setNext(new ValidTableHandler(restaurant, areaId))
      .setNext(new ValidPartySizeHandler(restaurant));

    const validReservation = validationChain.handle(reservation);

    const overlapReservations =
      await this.reservationService.getByTablesIdAndDateTime(
        validReservation.tablesId,
        validReservation.date,
        new TimeFrame(validReservation.fromHour, validReservation.toHour),
      );

    const requestedArea = restaurant.areas.find((area) => area.id == areaId);
    const requestedTableGroup = requestedArea.capacity.find(
      (tables) => tables.id == tablesId,
    );
    if (requestedTableGroup.quantity - overlapReservations.length <= 0) {
      throw new ReservationSlotException();
    }

    return validReservation;
  }
}
