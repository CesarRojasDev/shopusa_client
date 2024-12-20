import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionFormComponent } from './pages/publicacion-form/publicacion-form.component';
import { PublicacionListComponent } from './pages/publicacion-list/publicacion-list.component';
import { ShopusaModule } from '../shopusa.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicacionFormComponent,
    PublicacionListComponent
  ],
  imports: [
    CommonModule,
    PublicacionesRoutingModule,
    ReactiveFormsModule,
    ShopusaModule
  ]
})
export class PublicacionesModule { }
