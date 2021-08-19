import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from './user';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/usuario`;

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private httpClient: HttpClient) { }

    get(id: number): Observable<User> {
        return this.httpClient.get<User>(`${API}/${id}/`);
    }

}