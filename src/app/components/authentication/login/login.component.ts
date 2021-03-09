import { Component, OnInit } from '@angular/core';
import {Authentication} from '../../../models/authentication';
import {AuthenticationService} from '../../../services/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {JsonWebToken} from '../../../models/json-web-token';
import {concatMap} from 'rxjs/operators';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  login: Authentication = new Authentication();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  authenticate(): void{
    this.authenticationService.logout();
    this.authenticationService.login(this.login).pipe(
      concatMap((res: JsonWebToken) => {
        this.authenticationService.setToken(res);
        return this.userService.getByUsername(this.login.username);
      })
    ).subscribe((res: User) => {
      this.router.navigateByUrl('/').then(() => {});
      this.notificationService.sendNotification('Successfully logged in', 'success-notification');
      this.authenticationService.setCurrentUser(res);
    }, (error: HttpErrorResponse) => {
      if (error.status === 400) {
        console.log(error);
      }
      if (error.status === 404) {
        this.notificationService.sendNotification('Username dosen\'t exist' , 'error-notification');
        this.login.password = '';
        this.login.username = '';
      }
      if (error.status === 401) {
        this.notificationService.sendNotification('Wrong password', 'error-notification');
        this.login.password = '';
      }
    });
  }
}
