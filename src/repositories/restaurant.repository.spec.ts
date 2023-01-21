import { RestaurantRepository } from './restaurant.repository';
import { Test, TestingModule } from '@nestjs/testing';

 jest.mock('@aws-sdk/client-dynamodb', () => {
    return {
      DynamoDBClient: jest.fn().mockImplementation(() => {
        return {
            send: jest.fn().mockImplementation(() =>{
                return Promise.resolve({data:[]})
            }),
            QueryCommand: jest.fn().mockImplementation(() =>{
                return 
            })
        };
      }),
    };
  });
  
describe('restaurant repository', () => {
    let restaurantRepository: RestaurantRepository;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [RestaurantRepository],
      }).compile();
  
      restaurantRepository = module.get<RestaurantRepository>(RestaurantRepository);
    });
  
    describe('restaurant repository', () => {
      it('should return null since client is not mocked"', async () => {
       const ans = await restaurantRepository.getRecommendation(["burger"])
       expect(ans).toEqual(null)
      });
    });
  });
  
