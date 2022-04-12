import { Module } from '@nestjs/common';
import { RestaurantController } from '@application';

@Module({
  imports: [],
  controllers: [RestaurantController],
  providers: [],
})
export class AppModule {}
