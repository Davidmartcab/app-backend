import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { User } from 'src/models/user.model';

@Injectable()
export class DataService {

    // timeOut: number = 3600000;
    timeOut: number = 5000;

    constructor() {
    }
    
    users: User[] = [];
    chats: Message[] = [];

    clean() {
        console.log('Cleaning', new Date);
        let date = new Date();
        this.users.forEach((user, index) => {
            if(date.getTime() - user.lastReload.getTime() > this.timeOut) {
                this.users.splice(index, 1);
            }
        })
        this.cleanChats();
    }

    cleanChats() {
        this.chats = this.chats.filter(chat => this.users.filter(user => user.name === chat.from).length > 0 && this.users.filter(user => user.name === chat.to).length > 0);
    
    }

}
