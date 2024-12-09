import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { ComisionListComponent } from './pages/comision-list/comision-list.component';
import { ComisionFormComponent } from './pages/comision-form/comision-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: ComisionListComponent,
      },
      {
        path: 'crear',
        component: ComisionFormComponent,
      },
      {
        path: 'crear/:id',
        component: ComisionFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionRoutingModule { }
