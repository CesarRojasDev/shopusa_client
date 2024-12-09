import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'shopusa-producto-details',

  templateUrl: './producto-details.component.html',
})
export class ProductoDetailsComponent implements OnInit {

  public product?: Producto;
  public imageSelected: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
    .pipe(switchMap(({ sku }) => this.productService.getProductBySku(sku)))
    .subscribe((product) => {
        console.log(product);
        if (!product) this.router.navigateByUrl('');
          return this.product = product;
        
      });
  }
  changeImage(src: string):void {
    this.imageSelected = src;
  }
}
