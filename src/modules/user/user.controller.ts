import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private _user: UserService,
    ) {}

    @Get()
    getUser() {
        
    }

    @Post('/new')
    postUser(@Req() body, @Res() res) {
        if(this._user.newUser(body.body.name)) res.json({ message: 'User created', code: 0 });
        else res.json({ message: 'User already exists', code: 1 });
        return res;
    }

    @Post('/delete')
    deleteUser(@Req() body, @Res() res) {
        if(this._user.deleteUser(body.body.name)) res.json({ message: 'User deleted', code: 0 });
        else res.json({ message: 'User does not exist', code: 1 });
        return res;
    }

}
