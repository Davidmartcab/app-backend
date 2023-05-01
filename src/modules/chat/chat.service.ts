import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message.model';
import { DataService } from 'src/services/data/data.service';

@Injectable()
export class ChatService {
    constructor(
        private _data: DataService,
    ) {}

    sendMessage(message: string, from: string, to: string): boolean {
        if(!this.comprobar(from)) return false;
        if(!this.comprobar(to)) return false;
        this._data.chats.push(new Message(message, from, to));

        return true;
    }

    getChat(from: string, to: string): {messages: Message[], code: number} {
        if(!this.comprobar(from)) return {messages: [], code: 1};
        if(!this.comprobar(to)) return {messages: [], code: 1};
        return {messages: this._data.chats.filter(chat => (chat.from === from && chat.to === to) || (chat.from === to && chat.to === from)).sort((a, b) => a.date.getTime() - b.date.getTime()), code: 0};
    }

    getContacts(name: string): {contacts: string[], code: number} {
        // busca en chats todos los mensajes que tengan como from o to el nombre que le pasamos y devuelve un array con los nombres de los usuarios
        if(!this.comprobar(name)) return {contacts: [], code: 1};
        let contacts: string[] = [];
        this._data.chats.forEach(chat => {
            if(chat.from === name && !contacts.includes(chat.to)) contacts.push(chat.to);
            if(chat.to === name && !contacts.includes(chat.from)) contacts.push(chat.from);
        });
        return {contacts: contacts, code: 0};
    }



    private comprobar(name: string):boolean {
        return this._data.users.filter(user => user.name === name).length > 0 ? true : false;
    }
}
