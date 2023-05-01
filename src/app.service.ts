import { Injectable } from '@nestjs/common';
import { DataService } from './services/data/data.service';

@Injectable()
export class AppService {
  constructor(
    private _data: DataService,
  ) {}

  getApp() {
    return this._data.users;
  }
}
