import { ThemeService } from '../../services/theme.service';
import { Component, OnInit, Output } from '@angular/core';
import {UserService} from '../../services/user.service';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
isDarkmode: boolean;
  constructor(
    private themeService: ThemeService,
    public loaderService: LoaderService
  ) {
    themeService.initTheme();
    this.isDarkmode = themeService.isDarkMode();
   }

  ngOnInit(): void {
  }

  toggleDarkMode(): void {
    this.isDarkmode = this.themeService.isDarkMode();
    this.themeService.update(this.isDarkmode ? 'light-mode' : 'dark-mode');

  }
}
