import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('restaurants');
  //setting up swagger
  const favIconUrl =
    'https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg';
 
 
    const config = new DocumentBuilder()
    .setTitle('restaurant recomendation')
    .setDescription(
      `Api to recommend users some restaurants
      based on their favorite plates`,
    )
    .setVersion('1.0')
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Restaurant Advisor',
    customfavIcon: `${favIconUrl}`,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'restaurants/api',
    app,
    document,
    customOptions,
  );

  await app.listen(3000), '0.0.0.0';
}
bootstrap();
