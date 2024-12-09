import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoriasModule } from './categorias/categorias.module';
import { ComisionModule } from './comision/comision.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PlataformasModule } from './plataformas/plataformas.module';
import { ProductosModule } from './productos/productos.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { ShopusaRoutingModule } from './shopusa-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SubcategoriasModule } from './subcategorias/subcategorias.module';

@NgModule({
  declarations: [SidebarComponent, LayoutPageComponent, SidebarItemComponent],
  imports: [
    CategoriasModule,
    ComisionModule,
    CommonModule, 
    PlataformasModule,
    ProductosModule,
    PublicacionesModule,
    ShopusaRoutingModule,
    SubcategoriasModule,
  ],
})
export class ShopusaModule {}
