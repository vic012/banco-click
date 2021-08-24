import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { UserService } from './../user/user.service';
import { UserAuth } from './user-auth';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {

    private userSubject = new BehaviorSubject<UserAuth | null>(null);

    constructor(
        private tokenService: TokenService,
        private userService: UserService) {
        if (tokenService.hasToken()) {
            this.decodeAndNotify();
        }
    }

    setToken(token: string): void {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUserAuth(): Observable<UserAuth | null> {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify(): void {
        const token = this.tokenService.getToken();
        if (token) {
            const userAuth = jwt_decode(token) as UserAuth;
            this.userService.get(userAuth.user_id)
                .subscribe(user => {
                    userAuth.user = user;
                    this.userSubject.next(userAuth);
                });
        }
    }

    logout(): void {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

}