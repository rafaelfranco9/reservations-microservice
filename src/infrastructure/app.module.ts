import { Module } from '@nestjs/common';
import { RestaurantController } from '@application';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [RestaurantController],
  providers: [],
})
export class AppModule {}
