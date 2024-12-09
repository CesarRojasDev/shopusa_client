import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ComisionFormComponent } from './pages/comision-form/comision-form.component';
import { ComisionListComponent } from './pages/comision-list/comision-list.component';
import { ComisionRoutingModule } from './comision-routing.module';
import { ComisionService } from './services/comision.service';


@NgModule({
  declarations: [
    ComisionFormComponent,
    ComisionListComponent
  ],
  imports: [
    CommonModule,
    ComisionRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ComisionService]
})
export class ComisionModule { }
