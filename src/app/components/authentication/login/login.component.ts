import { Component, OnInit } from '@angular/core';
import {Authentication} from '../../../models/authentication';
import {AuthenticationService} from '../../../services/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

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
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  authenticate(): void{
    this.authenticationService.login(this.login).subscribe(
      (res) => {
        // logout -> CurrentUser and Token get cleared
        this.authenticationService.logout();
        this.authenticationService.setToken(res);
        this.notificationService.sendNotification('Successfully logged in', 'success-notification');
        // Todo: Get user and save in authenticationService, change subscribe to pipe
        this.router.navigateByUrl('/').then(() => {});
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.notificationService.sendNotification('Username dosen\'t exist' , 'error-notification');
          this.login.password = '';
          this.login.username = '';
        }
        if (error.status === 401) {
          this.notificationService.sendNotification('Wrong password', 'error-notification');
          this.login.password = '';
        }
      }
      );
  }
}
