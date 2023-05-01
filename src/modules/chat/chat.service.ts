import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { DataService } from 'src/services/data/data.service';

@Injectable()
export class ChatService {

    maxMessages: number = 100;
    constructor(
        private _data: DataService,
    ) {}

    sendMessage(message: string, from: string, to: string): boolean {
        if(!this.comprobar(from)) return false;
        if(!this.comprobar(to)) return false;
        this._data.chats.push(new Message(message, from, to));
        this._data.users.filter(user => user.name === to)[0].setNewMessage(from);

        return true;
    }

    getChat(from: string, to: string): {messages: Message[], code: number} {
        if(!this.comprobar(from)) return {messages: [], code: 1};
        if(!this.comprobar(to)) return {messages: [], code: 1};
        let messages = this._data.chats.filter(chat => (chat.from === from && chat.to === to) || (chat.from === to && chat.to === from)).sort((a, b) => a.date.getTime() - b.date.getTime())
        if(messages.length > this.maxMessages) {
            messages = messages.slice(messages.length - this.maxMessages, messages.length)
            this._data.chats = this._data.chats.filter(chat => (chat.from === from && chat.to === to) || (chat.from === to && chat.to === from));
        };
        return {messages: messages, code: 0};
    }

    getContacts(name: string): {contacts: string[], code: number} {
        if(!this.comprobar(name)) return {contacts: [], code: 1};
        let contacts: string[] = [];
        this._data.chats.forEach(chat => {
            if(chat.from === name && !contacts.includes(chat.to)) contacts.push(chat.to);
            if(chat.to === name && !contacts.includes(chat.from)) contacts.push(chat.from);
        });
        this._data?.users?.filter(user => user?.name === name)[0]?.reload();
        return {contacts: contacts, code: 0};
    }

    getNewMessages(chatName: string, name: string) {
        this._data?.users?.filter(user => user?.name === name)[0]?.reload();
        let user = this._data.users.filter(user => user.name === name)[0];
        if(user?.newMessage?.filter(newMessage => newMessage === chatName).length > 0) {
            user.resetNewMessage(chatName);
            return true;
        }
        return false
    }

    private comprobar(name: string):boolean {
        return this._data.users.filter(user => user.name === name).length > 0 ? true : false;
    }
}
