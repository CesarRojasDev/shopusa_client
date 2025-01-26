import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComisionFormComponent } from './pages/comision-form/comision-form.component';
import { ComisionListComponent } from './pages/comision-list/comision-list.component';
import { ComisionRoutingModule } from './comision-routing.module';
import { ShopusaModule } from '../shopusa.module';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ComisionFormComponent,
    ComisionListComponent,
  ],
  imports: [
    ComisionRoutingModule,
    CommonModule,
    ShopusaModule,
    ReactiveFormsModule,
    SharedModule
],
})
export class ComisionModule { }
