import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { PublicacionListComponent } from './pages/publicacion-list/publicacion-list.component';
import { PublicacionFormComponent } from './pages/publicacion-form/publicacion-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: PublicacionListComponent,
      },
      {
        path: 'crear',
        component: PublicacionFormComponent,
      },
      {
        path: 'crear/:id',
        component: PublicacionFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacionesRoutingModule { }
