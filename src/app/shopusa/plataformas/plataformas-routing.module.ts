import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { PlataformaListComponent } from './pages/plataforma-list/plataforma-list.component';
import { PlataformaFormComponent } from './pages/plataforma-form/plataforma-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: PlataformaListComponent,
      },
      {
        path: 'crear',
        component: PlataformaFormComponent,
      },
      {
        path: 'crear/:id',
        component: PlataformaFormComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformasRoutingModule { }
