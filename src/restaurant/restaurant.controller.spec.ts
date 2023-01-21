import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Test, TestingModule } from '@nestjs/testing';
import { preferences } from './dto/restaurant.dto';



const createRestaurantMockService = () => ({
    recommendations: jest.fn(),
  });

describe('RestaurantController', () => {
    let restaurantController: RestaurantController;
    let restaurantService: RestaurantService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [RestaurantController],
        providers: [
            RestaurantService,
            {
              provide: RestaurantService,
              useValue: createRestaurantMockService(),
            },
          ],
      }).compile();
  
      restaurantController = module.get<RestaurantController>(RestaurantController);
      restaurantService = module.get<RestaurantService>(RestaurantService);
    });
  
    describe('restaurant controller', () => {
      it('should return a list of restaurants', async() => {
        const serviceAnswer = [{id:"test",name:"test",pk:"test"}]
      const reccomendations = jest.spyOn(restaurantService,"recommendations").mockResolvedValueOnce(serviceAnswer)
      const body : preferences = {
        plates:["burger"]
      }
      const restaurantsAns = await restaurantController.getRecommendation(body)
      expect(restaurantsAns).toBeDefined()
      expect(reccomendations).toBeCalledTimes(1)
      expect(restaurantsAns).toEqual(serviceAnswer)
      });
    });
  });