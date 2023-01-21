import { Injectable } from '@nestjs/common';
import {RestaurantRepository} from '../repositories/restaurant.repository'


/**
 *  service to fetch restaurants from the DB
 */
@Injectable()
export class RestaurantService {
    /**
     * constructor for the restaurant service
     * @param restaurantRepository repository for the service
     */
    constructor(
        private restaurantRepository: RestaurantRepository,
    ) {}

    /**
     * gets restaurant recommendations based on the plates given by parameter
     * @param plates plates to look for restaurants
     * @returns a list of restaurants that offers the plates given by parameter
     */
    async recommendations(plates:[string]){
        return await this.restaurantRepository.getRecommendation(plates)
    }
}
