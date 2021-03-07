import { Component, OnInit } from '@angular/core';
import {Login} from '../../models/login';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  login: Login = new Login();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  authenticate(): void{
    this.authenticationService.login(this.login).subscribe(
      (res) => {
        // Todo: Add notification
        this.authenticationService.setToken(res);
        // Todo: Get user and save in authenticationService
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Todo: Notification user with username doesn't exist
          this.login.password = '';
          this.login.username = '';
        }
        if (error.status === 409) {
          // Todo: Notification wrong password
          this.login.password = '';
        }
      }
      );
  }
}
