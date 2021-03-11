import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {JsonWebToken} from '../models/json-web-token';
import {HttpClient} from '@angular/common/http';
import {Authentication} from '../models/authentication';
// @ts-ignore
import server from '../../environments/server.json';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public initAuthentication(): void {
    this.currentUser.next(JSON.parse(localStorage.getItem('currentUser')));
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  public setToken(token: JsonWebToken): void {
    localStorage.setItem('token', JSON.stringify(token.jwt));
  }

  public login(login: Authentication): Observable<JsonWebToken> {
    return this.httpClient.post<JsonWebToken>(server.address + '/auth', login);
  }

  public isAuthenticated(): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(!(this.currentUser.getValue() === null || this.getToken() === null));
  }

  public logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login').then(() => {});
  }

}
