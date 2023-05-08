import { uuid } from "uuidv4";

export class Message {
    _id: string;
    from: string;
    to: string;
    message: string;
    date: Date;
    deleted: boolean = false;

    constructor(message: string, from: string, to: string) {
        this._id = uuid();
        this.from = from;
        this.to = to;
        this.message = message;
        this.date = new Date();
    }
}