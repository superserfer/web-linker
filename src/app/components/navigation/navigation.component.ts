import { ThemeService } from './../../services/theme.service';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
isDarkmode: boolean;
  constructor(private themeService: ThemeService) {
    themeService.initTheme();
    this.isDarkmode = themeService.isDarkMode();
   }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.isDarkmode = this.themeService.isDarkMode();
    this.themeService.update(this.isDarkmode ? 'light-mode' : 'dark-mode');

  }
}
