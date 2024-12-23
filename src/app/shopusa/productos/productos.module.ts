import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoDetailsComponent } from './pages/producto-details/producto-details.component';
import { ProductosFormComponent } from './pages/productos-form/productos-form.component';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosRoutingModule } from './productos-routing.module';

@NgModule({
  declarations: [
    ProductoDetailsComponent,
    ProductosFormComponent,
    ProductosListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductosModule {}
