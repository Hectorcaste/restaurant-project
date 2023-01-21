import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({
    description: 'Check if DB and integrations with others its ok!',
  })
  @Get("/health")
  health() {
    return {
      status: 200,
      data: {
        successful: true,
        message: this.appService.getHealth(),
      },
    };
  }
}


