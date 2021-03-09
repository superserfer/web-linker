import { Component, OnInit } from '@angular/core';
import {Authentication} from '../../../models/authentication';
import {AuthenticationService} from '../../../services/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  authenticate(): void{
    this.authenticationService.login(this.login).subscribe(
      (res) => {
        // logout -> CurrentUser and Token get cleared
        this.authenticationService.logout();
        this.authenticationService.setToken(res);
        // Todo: Add notification
        // Todo: Get user and save in authenticationService
        this.router.navigateByUrl('/').then(() => {});
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Todo: Notification user with username doesn't exist
          this.login.password = '';
          this.login.username = '';
        }
        if (error.status === 401) {
          // Todo: Notification wrong password
          this.login.password = '';
        }
      }
      );
  }
}
