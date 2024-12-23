import { Component } from '@angular/core';

@Component({
  selector: 'shopusa-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isCategoriasOpen = false;
  isComisionesOpen = false;
  isImagenesOpen = false;
  isPlataformasOpen = false;
  isProductosOpen = false;
  isPublicacionesOpen = false;
  isSubcategoriasOpen = false;

  toggleImagenes() {
    this.isImagenesOpen = !this.isImagenesOpen;
  }

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
