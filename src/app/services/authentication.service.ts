import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {JsonWebToken} from '../models/json-web-token';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login';
// @ts-ignore
import server from '../../environments/server.json';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: User;
  private token: JsonWebToken;

  constructor(private httpClient: HttpClient) { }

  public getCurrentUser(): User{
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  public getToken(): JsonWebToken {
    return JSON.parse(localStorage.getItem('token'));
  }

  public setToken(token: JsonWebToken): void {
    localStorage.setItem('token', JSON.stringify(token));
    this.token = token;
  }

  public login(login: Login): Observable<JsonWebToken> {
    return this.httpClient.post<JsonWebToken>(server.address + '/auth', login);
  }

  public isAuthenticated(): boolean {
    return JsonWebToken !== undefined && JsonWebToken !== null;
  }
}
