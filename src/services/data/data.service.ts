import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';

@Injectable()
export class DataService {
    
    users: User[] = [];

}
