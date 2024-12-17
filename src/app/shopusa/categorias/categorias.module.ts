import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasFormComponent } from './pages/categorias-form/categorias-form.component';
import { CategoriasListComponent } from './pages/categorias-list/categorias-list.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { ShopusaModule } from '../shopusa.module';


@NgModule({
  declarations: [
    CategoriasFormComponent,
    CategoriasListComponent,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule,
    ShopusaModule
  ],
})
export class CategoriasModule { }
