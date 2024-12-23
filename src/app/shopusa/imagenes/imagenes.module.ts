import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { ImagenesUploadComponent } from './pages/imagenes-upload/imagenes-upload.component';
import { ShopusaModule } from '../shopusa.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ImagenesUploadComponent
  ],
  imports: [
    CommonModule,
    ImagenesRoutingModule,
    ShopusaModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImagenesModule { }
