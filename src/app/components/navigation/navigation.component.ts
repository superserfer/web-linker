import {ThemeService} from '../../services/theme.service';
import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isDarkmode: boolean;
  currentUser: User;
  constructor(
    private themeService: ThemeService,
    public loaderService: LoaderService,
    public authenticationService: AuthenticationService
  ) {
    themeService.initTheme();
    this.isDarkmode = themeService.isDarkMode();
    this.authenticationService.initAuthentication();
    this.authenticationService.currentUser.subscribe((res: User) => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {
  }

  toggleDarkMode(): void {
    this.isDarkmode = this.themeService.isDarkMode();
    this.themeService.update(this.isDarkmode ? 'light-mode' : 'dark-mode');

  }

  logout(): void {
    this.authenticationService.logout();
  }
}
