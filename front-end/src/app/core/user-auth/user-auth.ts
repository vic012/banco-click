import { User } from './../user/user';

export interface UserAuth {    
    user_id: number;
    exp: number;
    user: User;
}