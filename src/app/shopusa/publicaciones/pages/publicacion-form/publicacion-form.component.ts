import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../../../auth/service/auth.service';
import { Plataforma } from '../../../interfaces/comision.interface';
import { PlataformaService } from '../../../plataformas/services/plataforma.service';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../../productos/services/product.service';
import { PublicacionService } from '../../services/publicacion.service';

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
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      fechaPublicacion: [''],
      skuPlataforma: [''],
      productoId: [''],
      plataformaId: [''],
      precio: [''],
      usuarioId: [''],
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
  onCalcularPrecio(): void {
    const { productoId, plataformaId } = this.myForm.value;

    this.publicacionService.calcularPrecio(productoId, plataformaId).subscribe(
      (response) => {
        console.log(response)
        const precioCalculado = response.precio;
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

    this.authService.getCurrentUser().subscribe((user) => {
      this.myForm.patchValue({
        usuarioId: user.id,
      });
    });
    this.publicacionService.createPublicacion(this.myForm.value).subscribe(
      (response) => {
        console.log('Publicacion creada:', response);
        this.myForm.reset();
      },
      (error) => {
        console.error('Error al crear publicación:', error);
      }
    );
  }

  onReset(): void {
    this.myForm.reset();
  }
}
