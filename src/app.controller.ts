import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApp(@Res() res) {
    return res.json(this.appService.getApp());
  }
  
  @Post()
  postApp() {

  }

}
