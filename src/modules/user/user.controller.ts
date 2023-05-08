import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export default class UserController {
    constructor(
        private _user: UserService,
    ) {}

    @Get('/:name')
    getUser(@Req() body, @Res() res) {
        let user = this._user.getUser(body.params.name);
        if(user) res.json({ message: 'User found', code: 0, user: user });
        else res.json({ message: 'User not found', code: 1 });
        return res;
    }

    @Post('/new')
    postUser(@Req() body, @Res() res) {
        let user = this._user.newUser(body.body.name);
        if(user.code === 0) res.json({ message: 'User created', code: 0, user: user.User });
        else res.json({ message: 'User already exists', code: 1, user: user.User });
        return res;
    }

    @Post('/delete')
    deleteUser(@Req() body, @Res() res) {
        if(this._user.deleteUser(body.body.name)) res.json({ message: 'User deleted', code: 0 });
        else res.json({ message: 'User does not exist', code: 1 });
        return res;
    }

    @Get('/logout/:name')
    logOutUser(@Req() body, @Res() res) {
        console.log("Logout",body.params.name);
        let user = this._user.logOutUser(body.params.name);
        if(user) res.json({ message: 'User logOut', code: 0 });
        else res.json({ message: 'User not found', code: 1 });
        return res;
    }

}
