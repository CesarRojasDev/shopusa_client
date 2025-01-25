import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopusaRoutingModule } from './shopusa-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SidebarComponent,
    LayoutPageComponent,
    SidebarItemComponent,
    NavbarComponent,
    TableActionsComponent,
  ],
  imports: [CommonModule, ShopusaRoutingModule, SharedModule],
  exports: [TableActionsComponent],
})
export class ShopusaModule {}
