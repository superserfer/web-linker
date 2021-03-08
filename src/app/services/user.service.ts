import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import server from '../../environments/server.json';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getByUsername(username: string): Observable<User>{
    return this.httpClient.get<User>(server.address + '/user/byUsername/' + username);
  }

  public getById(id: string): Observable<User>{
    return this.httpClient.get<User>(server.address + '/user/byId/' + id);
  }

  public createUser(newUser: User): Observable<User> {
    return this.httpClient.post<User>(server.address + '/user/', newUser);
  }

  public updateUser(updatedUser: User): Observable<User> {
    return this.httpClient.put<User>(server.address + '/user/', updatedUser);
  }
}
