import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { Subcategoria } from '../../../interfaces/subcategoria.interface';
import { SubcategoriaService } from '../../../subcategorias/services/subcategoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'shopusa-productos-form',
  templateUrl: './productos-form.component.html',
})
export class ProductosFormComponent implements OnInit {
  public myForm: FormGroup;
  public subCategorias: Subcategoria[] = [];
  public id: string = '';
  public isEditMode: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private subCategoriaService: SubcategoriaService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      id: [null],
      nombre: [''],
      marca: [''],
      modelo: [''],
      subCategoriaId: [''],
      color: [''],
      descripcion: [''],
      caracteristica: [''],
      precioUSD: [''],
      sku: [''],
      link: [''],
    });
  }

  ngOnInit(): void {
    // Cargar las subcategorías
    this.subCategoriaService
      .getSubCategorias()
      .subscribe((subCategorias: Subcategoria[]) => {
        this.subCategorias = subCategorias;
      });

    // Si estamos en modo edición, cargar los datos del producto
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
          this.router.navigateByUrl('shopusa/productos/listado'); // Redirigir a la lista de productos
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
        this.router.navigateByUrl('shopusa/productos/listado'); // Redirigir a la lista de productos
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
      }
    );
  }
}
