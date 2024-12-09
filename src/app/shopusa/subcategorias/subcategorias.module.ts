import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SubcategoriasFormComponent } from './pages/subcategorias-form/subcategorias-form.component';
import { SubcategoriasListComponent } from './pages/subcategorias-list/subcategorias-list.component';
import { SubcategoriasRoutingModule } from './subcategorias-routing.module';


@NgModule({
  declarations: [
    SubcategoriasFormComponent,
    SubcategoriasListComponent,
  ],
  imports: [
    CommonModule,
    SubcategoriasRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SubcategoriasModule { }
