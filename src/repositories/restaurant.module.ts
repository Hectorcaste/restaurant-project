import { Module } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';


@Module({
  providers: [RestaurantRepository],
  exports: [RestaurantRepository],
})
export class RepositoryModule {}
