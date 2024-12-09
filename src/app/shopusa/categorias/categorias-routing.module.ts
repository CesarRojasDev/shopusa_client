import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { CategoriasListComponent } from './pages/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from './pages/categorias-form/categorias-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: CategoriasListComponent,
      },
      {
        path: 'crear',
        component: CategoriasFormComponent,
      },
      {
        path: 'crear/:id',
        component: CategoriasFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
