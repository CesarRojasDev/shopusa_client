import { Component } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'shopusa-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isProductosOpen = false;
  isCategoriasOpen = false;
  isSubcategoriasOpen = false;
  isComisionesOpen = false;
  isPlataformasOpen = false;
  isPublicacionesOpen = false;
  constructor(private authService: AuthService) {}
  toggleProductos() {
    this.isProductosOpen = !this.isProductosOpen;
  }

  toggleCategorias() {
    this.isCategoriasOpen = !this.isCategoriasOpen;
  }
  toggleSubcategorias() {
    this.isSubcategoriasOpen = !this.isSubcategoriasOpen;
  }
  toggleComisiones() {
    this.isComisionesOpen = !this.isComisionesOpen;
  }
  togglePlataformas() {
    this.isPlataformasOpen = !this.isPlataformasOpen;
  }
  togglePublicaciones() {
    this.isPublicacionesOpen = !this.isPublicacionesOpen;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
