import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosModule } from './productos/productos.module';
import { ShopusaRoutingModule } from './shopusa-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';

@NgModule({
  declarations: [SidebarComponent, LayoutPageComponent, SidebarItemComponent, NavbarComponent,TableActionsComponent ],
  imports: [
    CommonModule, 
    ProductosModule,
    ShopusaRoutingModule,
  ],
  exports:[TableActionsComponent]
})
export class ShopusaModule {}
