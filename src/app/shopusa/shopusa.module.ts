import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasFormComponent } from './pages/categorias-page/categorias-form/categorias-form.component';
import { CategoriasListComponent } from './pages/categorias-page/categorias-list/categorias-list.component';
import { ComisionFormComponent } from './pages/comision-page/comision-form/comision-form.component';
import { ComisionListComponent } from './pages/comision-page/comision-list/comision-list.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PlataformaFormComponent } from './pages/plataformas-page/plataforma-form/plataforma-form.component';
import { PlataformaListComponent } from './pages/plataformas-page/plataforma-list/plataforma-list.component';
import { ProductoDetailsComponent } from './pages/productos-page/producto-details/producto-details.component';
import { ProductosFormComponent } from './pages/productos-page/productos-form/productos-form.component';
import { ProductosListComponent } from './pages/productos-page/productos-list/productos-list.component';
import { PublicacionFormComponent } from './pages/publicaciones-page/publicacion-form/publicacion-form.component';
import { PublicacionListComponent } from './pages/publicaciones-page/publicacion-list/publicacion-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopusaRoutingModule } from './shopusa-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SubcategoriasFormComponent } from './pages/subcategorias-page/subcategorias-form/subcategorias-form.component';
import { SubcategoriasListComponent } from './pages/subcategorias-page/subcategorias-list/subcategorias-list.component';

@NgModule({
  declarations: [
    CategoriasFormComponent,
    CategoriasListComponent,
    ComisionFormComponent,
    ComisionFormComponent,
    ComisionListComponent,
    ComisionListComponent,
    LayoutPageComponent,
    PlataformaFormComponent,
    PlataformaFormComponent,
    PlataformaListComponent,
    PlataformaListComponent,
    ProductoDetailsComponent,
    ProductoDetailsComponent,
    ProductosFormComponent,
    ProductosListComponent,
    PublicacionFormComponent,
    PublicacionFormComponent,
    PublicacionListComponent,
    PublicacionListComponent,
    SidebarComponent,
    SidebarItemComponent,
    SubcategoriasFormComponent,
    SubcategoriasListComponent,
  ],
  imports: [CommonModule, ShopusaRoutingModule, ReactiveFormsModule],
})
export class ShopusaModule {}
