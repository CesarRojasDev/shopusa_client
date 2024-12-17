import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plataforma } from '../../../interfaces/comision.interface';
import { PlataformaService } from '../../../plataformas/services/plataforma.service';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../../productos/services/product.service';

@Component({
  selector: 'app-publicacion-form',
  templateUrl: './publicacion-form.component.html',
})
export class PublicacionFormComponent implements OnInit {
  public productos: Producto[] = [];
  public plataformas: Plataforma[] = [];
  public myForm: FormGroup;
  constructor(
    private productService: ProductService,
    private plataformaService: PlataformaService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      fecha: [''],
      skuPlataforma: [''],
      productoId: [''],
      plataformaId: [''],
      precio: [''],
    });
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((productos: Producto[]) => {
      this.productos = productos;
    });
    this.plataformaService
      .getPlataformas()
      .subscribe((plataformas: Plataforma[]) => {
        this.plataformas = plataformas;
      });
  
  }


}
