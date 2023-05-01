import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { User } from 'src/models/user.model';

@Injectable()
export class DataService {

    timeOut: number = 60000;

    constructor() {
        this.users.push(new User('user1'));
        this.users.push(new User('user2'));
        this.chats.push(new Message('Hola', 'user1', 'user2'));
        setTimeout(() => {
            this.chats.push(new Message('Hola', 'user2', 'user1'));
            setTimeout(() => {
                this.chats.push(new Message('Que tal?', 'user1', 'user2'));
                setTimeout(() => {
                    this.chats.push(new Message('Bien', 'user2', 'user1'));
                }, 100);
            }, 100);
        }, 100);

    }
    
    users: User[] = [];
    chats: Message[] = [];

    clean() {
        console.log('Cleaning');
        let date = new Date();
        this.users.forEach((user, index) => {
            if(date.getTime() - user.lastReload.getTime() > this.timeOut) {
                this.users.splice(index, 1);
            }
        })
        this.cleanChats();
    }

    cleanChats() {
        this.chats.forEach((chat, index) => {
            if(!this.users.find(user => user.name == chat.from) || !this.users.find(user => user.name == chat.to)) {
                this.chats.splice(index, 1);
            }
        })
    }

}
