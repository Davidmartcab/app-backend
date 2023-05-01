import { Controller, Get, OnModuleInit, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { DataService } from './services/data/data.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private appService: AppService,
    private _data: DataService,
    ) {}

  onModuleInit() {
    this.onStart();
  }


  async onStart() {
    while(true) {
      await new Promise((resolve) => setTimeout(resolve, this._data.timeOut));
      this._data.clean();
    }
  }

  @Get()
  getApp(@Res() res) {
    return res.json(this.appService.getApp());
  }
  
  @Post()
  postApp() {

  }

}
