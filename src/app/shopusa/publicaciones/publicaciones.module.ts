import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionFormComponent } from './pages/publicacion-form/publicacion-form.component';
import { PublicacionListComponent } from './pages/publicacion-list/publicacion-list.component';


@NgModule({
  declarations: [
    PublicacionFormComponent,
    PublicacionListComponent
  ],
  imports: [
    CommonModule,
    PublicacionesRoutingModule
  ]
})
export class PublicacionesModule { }
