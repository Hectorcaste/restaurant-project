import { Controller, Post,Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { preferences } from './dto/restaurant.dto';

@ApiTags('restaurant')
@Controller()
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}
  /**
   * returns a list of restaurants that offers the plates the user wants
   * @param plates list of plates the user wants
   * @returns list of restaurants
   */
  @ApiOperation({
    description: 'returns a list of restaurants based on the plates the user wants to eat',
  })
  @Post('/recommendation')

  getRecommendation(
    @Body() plates: preferences
  ) {
 return this.restaurantService.recommendations(plates.plates)
}
}