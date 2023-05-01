import { Injectable } from '@nestjs/common';
import { DataService } from './services/data/data.service';

@Injectable()
export class AppService {
  constructor(
    private _data: DataService,
  ) {}



  getApp() {
    return {users: this._data.users, chats: this._data.chats};
  }

  deleteApp() {
    this._data.users = [];
    this._data.chats = [];
    return {users: this._data.users, chats: this._data.chats};
  }
}
