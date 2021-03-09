import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {concatMap} from 'rxjs/operators';
import {Authentication} from '../../../models/authentication';
import {JsonWebToken} from '../../../models/json-web-token';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hideRepeat = true;
  newUser: User = {username: '', email: '', password: '', collections: null, id: null};
  passwordVerification = '';
  isPasswordStrong = true;
  isPasswordsMatching = true;
  hasAllAttributes = true;
  isValidEmail = true;


  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    // Check if input is valid
    this.isPasswordStrong = this.newUser.password.length >= 7 ;
    this.isPasswordsMatching = this.newUser.password === this.passwordVerification;
    this.hasAllAttributes = this.newUser.username !== '' || this.newUser.password !== '' || this.newUser.email !== '';
    this.isValidEmail = this.validateEmail(this.newUser.email);
    // If a input is wrong don't create user
    if (!this.hasAllAttributes || !this.isPasswordsMatching || !this.isPasswordStrong || !this.isValidEmail) {
      return;
    }
    this.userService.createUser(this.newUser).pipe(
      concatMap((user: User) => {
        this.authenticationService.setCurrentUser(user);
        // Create Authentication to authenticate the user automatically
        const login: Authentication = new Authentication();
        login.username = this.newUser.username;
        login.password = this.newUser.password;
        return this.authenticationService.login(login);
      })).subscribe(
      (jsonWebToken: JsonWebToken) => {
        this.authenticationService.setToken(jsonWebToken);
        this.notificationService.sendNotification('Successfully registered', 'success-notification');
        this.router.navigateByUrl('/').then(() => {});
      }, (error: HttpErrorResponse) => {
        switch (error.status) {
          case 409:
            this.notificationService.sendNotification(error.message, 'error-notification');
            break;
          case 404:
            this.notificationService.sendNotification('Successfully registered, please authenticate yourself', 'success-notification');
            this.router.navigateByUrl('/login').then(() => {});
            break;
          case  400:
            this.notificationService.sendNotification('Something went wrong', 'error-notification');
            break;
        }
      }
    );

  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
