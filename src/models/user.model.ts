import { uuid } from "uuidv4";

export class User {
    _id: string;
    name: string;
    lastReload: Date;
    
    constructor(name: string) {
        this._id = uuid();
        this.name = name;
        this.lastReload = new Date();
    }

    reload() {
        this.lastReload = new Date();
    }


}