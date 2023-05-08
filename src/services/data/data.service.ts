import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { User } from 'src/models/user.model';

@Injectable()
export class DataService {

    // timeOut: number = 3600000;
    timeOut: number = 6000;
    timesForMessages: number = 10;

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
        this.deleteOldChats();
        this.cleanChats();
    }

    cleanChats() {
        this.chats = this.chats.filter(chat => this.users.filter(user => user.name === chat.from).length > 0 && this.users.filter(user => user.name === chat.to).length > 0);
    }

    deleteOldChats() {
        this.chats.forEach((chat, index) => {
            if(((new Date().getTime() - chat.date.getTime()) > (this.timeOut * this.timesForMessages)) && chat.deleted === false) {
                this.chats[index].message = 'This message has been deleted at: ' + new Date().toLocaleString();
                this.chats[index].deleted = true;
                this.users.filter(user => user.name === this.chats[index].to)[0].setNewMessage(this.chats[index].from);
                this.users.filter(user => user.name === this.chats[index].from)[0].setNewMessage(this.chats[index].to);
                console.log('Deleting message', this.users);
            }

            if(((new Date().getTime() - chat.date.getTime()) > (this.timeOut * this.timesForMessages)) && chat.deleted === true) {
                this.chats.splice(index, 1);
            }
        })

    }

}
