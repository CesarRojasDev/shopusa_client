import { Component, computed, inject  } from '@angular/core';

import { AuthService } from '../../../auth/service/auth.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'shopusa-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {

  public authService = inject( AuthService );
  public themeService = inject( ThemeService );
  public isUserMenuOpen = false;
  public user = computed(() => this.authService.currentUser());

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  onLogout(): void {
    this.authService.logout();
  }
    toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkModeEnabled();
  }
}
