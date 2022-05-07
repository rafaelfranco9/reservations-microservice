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
} from '@domain';

@Injectable()
export class ReservationValidationPipe implements PipeTransform {
  constructor(
    @Inject(ReservationService)
    private readonly reservationService: IReservationService,
    @Inject(RestaurantService)
    private readonly restaurantService: IRestaurantService,
  ) {}

  async transform(
    reservation: CreateReservationDto,
    metadata: ArgumentMetadata,
  ) {
    const { areaId, tablesId, restaurantId } = reservation;
    const restaurant = await this.restaurantService.getOne(restaurantId);

    const validationChain = new ChainInitializer<CreateReservationDto>();
    validationChain
      .setNext(new ValidDateHandler())
      .setNext(new ValidTimeframeHandler(restaurant))
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

//TODO: VALIDATE BOOKING SERVICE CONDITIONS
