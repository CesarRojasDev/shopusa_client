import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'shopusa-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  public isUserMenuOpen = false;
  public userName: string = '';
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userName = user.username;
      }
    });
  }
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
