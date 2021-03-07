import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';

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


  constructor() { }

  ngOnInit(): void {
  }

  register(): void {
    this.isPasswordStrong = this.newUser.password.length >= 7 ;
    this.isPasswordsMatching = this.newUser.password === this.passwordVerification;
    this.hasAllAttributes = this.newUser.username !== '' || this.newUser.password !== '' || this.newUser.email !== '';
    this.isValidEmail = this.validateEmail(this.newUser.email);
    if (!this.hasAllAttributes || !this.isPasswordsMatching || !this.isPasswordStrong || !this.isValidEmail) {
      return;
    }
    // Todo: Request Backend
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
