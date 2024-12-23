import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { SubcategoriasFormComponent } from './pages/subcategorias-form/subcategorias-form.component';
import { SubcategoriasListComponent } from './pages/subcategorias-list/subcategorias-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: SubcategoriasListComponent,
      },
      {
        path: 'crear',
        component: SubcategoriasFormComponent,
      },
      {
        path: 'editar/:id',
        component: SubcategoriasFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriasRoutingModule { }
