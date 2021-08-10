import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  authenticate(usuario: string, senha: string) {
    return this.httpClient
      .post(`${environment.apiUrl}/user/login`, { usuario , senha });
  }

}
