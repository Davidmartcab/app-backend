import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(
        private _chat: ChatService,
    ) {}

    @Post('/send')
    sendMessage(@Req() body, @Res() res) {
        if(this._chat.sendMessage(body.body.message, body.body.from, body.body.to)) res.json({ message: 'Message sent', code: 0 });
        else res.json({ message: 'Message not sent', code: 1 });
        return res;
    }

    @Post('/get')
    getMessages(@Req() body, @Res() res) {
        let chat = this._chat.getChat(body.body.from, body.body.to);
        res.json({ messages: chat.messages, code: chat.code });
        return res;
    }

    @Post('/getcontacts')
    getContacts(@Req() body, @Res() res) {
        let contacts = this._chat.getContacts(body.body.name);
        res.json({ contacts: contacts.contacts, code: contacts.code});
        return res;
    }

    @Get('/:chatName/:name')
    getNewMessages(@Req() body, @Res() res) {
        let newMessages = this._chat.getNewMessages(body.params.chatName, body.params.name);
        res.json({ code: newMessages ? 0 : 1 });
        return res;
    }
}
