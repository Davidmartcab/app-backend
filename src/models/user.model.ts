import { uuid } from "uuidv4";

export class User {
    _id: string;
    name: string;
    contacts: string[];
    
    constructor(name: string) {
        this._id = uuid();
        this.name = name;
        this.contacts = [];
    }
}