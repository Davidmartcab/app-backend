import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataService } from './services/data/data.service';
import UserController from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { ChatController } from './modules/chat/chat.controller';
import { ChatService } from './modules/chat/chat.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, ChatController],
  providers: [AppService, DataService, UserService, ChatService],
})
export class AppModule {}
