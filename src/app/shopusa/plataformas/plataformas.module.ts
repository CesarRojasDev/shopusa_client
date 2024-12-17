import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlataformasRoutingModule } from './plataformas-routing.module';
import { PlataformaFormComponent } from './pages/plataforma-form/plataforma-form.component';
import { PlataformaListComponent } from './pages/plataforma-list/plataforma-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopusaModule } from '../shopusa.module';


@NgModule({
  declarations: [
    PlataformaFormComponent,
    PlataformaListComponent,
  ],
  imports: [
    CommonModule,
    PlataformasRoutingModule,
    ReactiveFormsModule,
    ShopusaModule
  ],
})
export class PlataformasModule { }
