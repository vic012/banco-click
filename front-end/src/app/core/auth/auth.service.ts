import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserAuthService } from '../user-auth/user-auth.service';
import { environment } from './../../../environments/environment';

const API = `${environment.apiUrl}/token/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  authenticate(username: string, password: string) {
    return this.httpClient
      .post<{ access: string , refresh: string}>(API, { username , password })
      .pipe(tap(res => {
        const authToken: string = res.access;
        this.userAuthService.setToken(authToken);
      }));
  }

}
