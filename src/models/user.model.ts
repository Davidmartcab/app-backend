import { uuid } from "uuidv4";

export class User {
    _id: string;
    name: string;
    lastReload: Date;
    newMessage: string[];
    connected: boolean;
    
    constructor(name: string) {
        this._id = uuid();
        this.name = name;
        this.lastReload = new Date();
        this.newMessage = [];
        this.connected = false;
    }

    reload() {
        this.connected = true;
        this.lastReload = new Date();
    }

    setNewMessage(name: string) {
        this.newMessage.push(name);
    }

    resetNewMessage(name: string) {
        this.newMessage.splice(this.newMessage.indexOf(name), 1);
    }


}