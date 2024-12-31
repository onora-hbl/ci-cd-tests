import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getCount')
  getCount(): { count: number } {
    return {
      count: this.appService.getCount(),
    };
  }

  @Post('/increment')
  increment(): { count: number } {
    this.appService.increment();
    return {
      count: this.appService.getCount(),
    };
  }
}
