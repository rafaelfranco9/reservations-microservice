import { TypeOrmConfigService } from '@database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation.module';

import { ReservationServiceModule } from './reservationService.module';
import { RestaurantModule } from './restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    RestaurantModule,
    ReservationModule,
    ReservationServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
