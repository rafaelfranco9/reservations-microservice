import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {
  ChainInitializer,
  CreateRestaurantDto,
  ValidOperationHoursHandler,
} from '@domain';

@Injectable()
export class RestaurantValidationPipe implements PipeTransform {
  async transform(restaurant: CreateRestaurantDto, metadata: ArgumentMetadata) {
    const validationChain = new ChainInitializer<CreateRestaurantDto>();
    validationChain.setNext(new ValidOperationHoursHandler());

    return validationChain.handle(restaurant);
  }
}
