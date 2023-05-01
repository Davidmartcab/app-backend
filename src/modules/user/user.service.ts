import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { DataService } from 'src/services/data/data.service';

@Injectable()
export class UserService {
    constructor(
        private _data: DataService,
    ) {}

    newUser(name: string) {
        if(this.comprobar(name)) return false;

        this._data.users.push(new User(name));
        return true;
    }

    deleteUser(name: string) {
        if(!this.comprobar(name)) return false;

        this._data.users = this._data.users.filter(user => user.name !== name);
        return true;
    }

    getUser(name: string) {
        if(!this.comprobar(name)) return false;
        this._data.users.filter(user => user.name === name)[0].lastReload = new Date();
        return this._data.users.filter(user => user.name === name)[0];
    }

    private comprobar(name: string):boolean {
        return this._data.users.filter(user => user.name === name).length > 0 ? true : false;
    }
}
