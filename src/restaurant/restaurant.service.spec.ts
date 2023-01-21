import { Test, TestingModule } from '@nestjs/testing';
import {RestaurantRepository} from '../repositories/restaurant.repository'
import { RestaurantService } from './restaurant.service';
const createRestaurantMockRepo = () => ({
    getRecommendation: jest.fn(),
  });


  describe('RestaurantService', () => {
    let restaurantRepo: RestaurantRepository;
    let restaurantService: RestaurantService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports:[],
            controllers: [],
          providers: [
            RestaurantService,
            RestaurantRepository,
              {
                provide: RestaurantRepository,
                useValue: createRestaurantMockRepo(),
              },
            ],
        }).compile();
        restaurantRepo = module.get<RestaurantRepository>(RestaurantRepository);
        restaurantService = module.get<RestaurantService>(RestaurantService);
      });

      describe('restaurant service', () => {
        it('should return a list of restaurants', async() => {
          const repoAnswer = [{id:"test",name:"test",pk:"test"}]
        const reccomendations = jest.spyOn(restaurantRepo,"getRecommendation").mockResolvedValueOnce(repoAnswer)
        
        const restaurantsAns = await restaurantService.recommendations(["burger"])
        expect(restaurantsAns).toBeDefined()
        expect(reccomendations).toBeCalledTimes(1)
        expect(restaurantsAns).toEqual(repoAnswer)
        });
      });
    }); 