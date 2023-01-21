import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RepositoryModule } from '../repositories/restaurant.module';


@Module({
    imports: [RepositoryModule],
  controllers: [
    RestaurantController,
  ],
  exports: [RestaurantService],
  providers: [RestaurantService],
})
export class RestaurantModule {}
