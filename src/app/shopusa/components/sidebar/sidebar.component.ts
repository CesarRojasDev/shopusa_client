import { Component } from '@angular/core';

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
}
