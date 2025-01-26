import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { ImagenesUploadComponent } from './pages/imagenes-upload/imagenes-upload.component';
import { SharedModule } from '../../shared/shared.module';
import { ShopusaModule } from '../shopusa.module';


@NgModule({
  declarations: [
    ImagenesUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImagenesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ShopusaModule,
  ]
})
export class ImagenesModule { }
