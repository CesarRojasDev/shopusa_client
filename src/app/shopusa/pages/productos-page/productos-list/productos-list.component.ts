import { Component, OnInit } from '@angular/core';

import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'shopusa-productos-list',
  templateUrl: './productos-list.component.html',
})
export class ProductosListComponent implements OnInit {

  products: Producto[] = [];
  constructor(private productService: ProductService) {}

ngOnInit(): void {
  this.productService.getProducts().subscribe((products) => {
    console.log(products);
    this.products = products;
  });
}
}
