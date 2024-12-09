import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { SubCategoriaService } from '../../../services/subCategoria.service';
import { Subcategoria } from '../../../interfaces/subcategoria.interface';

@Component({
  selector: 'shopusa-productos-form',
  templateUrl: './productos-form.component.html',
})
export class ProductosFormComponent implements OnInit {

  public myForm: FormGroup;
  public subCategorias: Subcategoria[] = []

  constructor(
    private subCategoriaService: SubCategoriaService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      nombre: [''],
      marca: [''],
      modelo: [''],
      subCategoriaId: [''],
      color: [''],
      descripcion: [''],
      caracteristica:[''],
      precioUSD: [''],
      sku: [''],
      link: [''],
    });
  }
  ngOnInit(): void {
    this.subCategoriaService.getSubCategorias().subscribe((subCategorias: Subcategoria[]) => {
      this.subCategorias = subCategorias;
    });
  }

   onSave(): void {
    this.productService.createProduct(this.myForm.value).subscribe(
      (response => {
        console.log('Producto creado:', response)
        this.myForm.reset()
      })
      ,
      (error => {
        console.log('Error al crear producto:', error)
      })
    )
  }
}
