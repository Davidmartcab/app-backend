import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { DataService } from 'src/services/data/data.service';

@Injectable()
export class UserService {
    constructor(
        private _data: DataService,
    ) {}

    newUser(name: string): {User: User, code: number} {
        let code = 0;
        if(this.comprobar(name)) code = 1;
        else this._data.users.push(new User(name));
        return {User: this._data.users.filter(user => user.name === name)[0], code: code};
    }

    deleteUser(name: string) {
        if(!this.comprobar(name)) return false;

        this._data.users = this._data.users.filter(user => user.name !== name);
        this._data.cleanChats();
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
