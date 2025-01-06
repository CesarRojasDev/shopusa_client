import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../services/product.service';
import { Subcategoria } from '../../../interfaces/subcategoria.interface';
import { SubcategoriaService } from '../../../subcategorias/services/subcategoria.service';

@Component({
  selector: 'shopusa-productos-form',
  templateUrl: './productos-form.component.html',
})
export class ProductosFormComponent implements OnInit {

  public id: string = '';
  public isEditMode: boolean = false;
  public myForm: FormGroup;
  public subCategorias: Subcategoria[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private subCategoriaService: SubcategoriaService,
  ) {
    this.myForm = this.fb.group({
      caracteristica: [''],
      color: [''],
      descripcion: [''],
      id: [null],
      link: [''],
      marca: [''],
      stock: ['4'],
      modelo: [''],
      nombre: [''],
      precioUSD: [''],
      sku: [''],
      subCategoriaId: [''],
    });
  }

  ngOnInit(): void {
    this.subCategoriaService
      .getSubCategorias()
      .subscribe((subCategorias: Subcategoria[]) => {
        this.subCategorias = subCategorias;
      });

    this.activateRoute.params.subscribe(({ id }) => {
      if (id) {
        this.isEditMode = true;
        this.id = id;
        this.productService
          .getProductById(id)
          .subscribe((product: Producto) => {
            if (product) {
              this.myForm.patchValue(product);
            }
          });
      }
    });
  }

  onSave(): void {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.productService.createProduct(this.myForm.value).subscribe(
        (response) => {
          console.log('Producto creado:', response);
          this.router.navigateByUrl('shopusa/productos/listado'); 
        },
        (error) => {
          console.error('Error al crear producto:', error);
        }
      );
    }
  }

  onUpdate(): void {
    this.productService.updateProducto(this.myForm.value, this.id).subscribe(
      (response) => {
        console.log('Producto actualizado:', response);
        this.router.navigateByUrl('shopusa/productos/listado');
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
      }
    );
  }

  onReset(): void {
    this.myForm.reset();
  }
}
