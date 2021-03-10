import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = this.authenticationService.getToken();
    const requestWithAuthentication: HttpRequest<unknown> = request.clone({
      setHeaders: {
        Bearer:  `${jwt}`
      }});
    return next.handle(requestWithAuthentication);
  }
}
