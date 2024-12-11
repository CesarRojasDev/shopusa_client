import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosFormComponent } from './pages/productos-form/productos-form.component';
import { ProductoDetailsComponent } from './pages/producto-details/producto-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: ProductosListComponent,
      },
      {
        path: 'crear',
        component: ProductosFormComponent,
      },
      {
        path: 'editar/:id',
        component: ProductosFormComponent,
      },
      {
        path: 'detalle/:sku',
        component: ProductoDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
