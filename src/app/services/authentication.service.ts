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
  private token: JsonWebToken;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public getCurrentUser(): User{
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  public setToken(token: JsonWebToken): void {
    localStorage.setItem('token', JSON.stringify(token.jwt));
    this.token = token;
  }

  public login(login: Authentication): Observable<JsonWebToken> {
    return this.httpClient.post<JsonWebToken>(server.address + '/auth', login);
  }

  public isAuthenticated(): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(!(this.getCurrentUser() === null || this.getToken() === null));
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login').then(() => {});
  }

}
