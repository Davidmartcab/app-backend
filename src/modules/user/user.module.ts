import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataService } from 'src/services/data/data.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, DataService],
})
export class UserModule {}
