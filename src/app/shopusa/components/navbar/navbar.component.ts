import { Component, computed, inject  } from '@angular/core';

import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'shopusa-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent  {
  public authService = inject( AuthService );
  public isUserMenuOpen = false;
  public user = computed(() => this.authService.currentUser());

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
