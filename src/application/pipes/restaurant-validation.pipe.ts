import {
  ChainInitializer,
  CreateRestaurantDto,
  ValidOperationHoursHandler,
} from '@domain';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class RestaurantValidationPipe implements PipeTransform {
  async transform(restaurant: CreateRestaurantDto, metadata: ArgumentMetadata) {
    const validationChain = new ChainInitializer<CreateRestaurantDto>();
    validationChain.setNext(new ValidOperationHoursHandler());

    const validRestaurant = validationChain.handle(restaurant);

    return validRestaurant;
  }
}
