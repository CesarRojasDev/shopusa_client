import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Plataforma } from '../../../interfaces/comision.interface';
import { PlataformaService } from '../../../plataformas/services/plataforma.service';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../../productos/services/product.service';
import { PublicacionService } from '../../services/publicacion.service';
import { ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-publicacion-form',
  templateUrl: './publicacion-form.component.html',
})
export class PublicacionFormComponent implements OnInit {
  public productos: Producto[] = [];
  public plataformas: Plataforma[] = [];
  public myForm: FormGroup;
  public isPriceCalculated: boolean = false;
  constructor(
    private productService: ProductService,
    private plataformaService: PlataformaService,
    private publicacionService: PublicacionService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      fecha: [''],
      skuPlataforma: [''],
      sku: [''],
      plataforma: [''],
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

    this.myForm.get('precio')?.disable();
  }
  onCalcularPrecio(): void {
   const { sku, plataforma } = this.myForm.value;

    this.publicacionService.calcularPrecio(sku, plataforma).subscribe(
      (response) => {
        const precioCalculado = response.precio;
        console.log('Precio calculado:', precioCalculado);

        this.myForm.patchValue({
          precio: precioCalculado,
        });

        this.isPriceCalculated = true;
      },
      (error) => {
        console.error('Error al calcular el precio:', error);
        this.isPriceCalculated = false;
      }
    );
  }

  onSave(): void {
      if (!this.isPriceCalculated) return;
    // Registrar la publicación
    console.log('Formulario enviado:', this.myForm.value);
    // Lógica para enviar la publicación...
  }

  onReset(): void{
    this.myForm.reset();
  }
}
