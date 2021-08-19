import { Injectable } from "@angular/core";

const KEY = 'bancoClickToken';

@Injectable({
    providedIn: "root"
})
export class TokenService{

    hasToken(): boolean {        
        return !!this.getToken();
    }

    setToken(token: string): void {
        window.localStorage.setItem(KEY, token);
    }

    getToken(): string | null {
        return window.localStorage.getItem(KEY);
    }

    removeToken(): void {
        window.localStorage.removeItem(KEY);
    }

}