import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagenesUploadComponent } from './pages/imagenes-upload/imagenes-upload.component';
import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'upload',
        component: ImagenesUploadComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenesRoutingModule {}
