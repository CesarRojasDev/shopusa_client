import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../../../auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shopusa-producto-details',

  templateUrl: './producto-details.component.html',
})
export class ProductoDetailsComponent implements OnInit {
  public product?: Producto;
  public imageSelected: string = '';
  public isAdmin: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ sku }) => this.productService.getProductBySku(sku)))
      .subscribe((product) => {
        console.log(product);
        if (!product) this.router.navigateByUrl('');
        return (this.product = product);
      });
    this.isAdmin = this.authService.isAdmin();
  }
  changeImage(src: string): void {
    this.imageSelected = src;
  }
  onDelete(id: string): void {
    if (this.isAdmin) {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'No podras deshacer esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(id).subscribe((response) => {
            this.router.navigateByUrl('shopusa/productos/listado');
          });
          Swal.fire({
            title: 'Eliminado!',
            text: 'Producto eliminado exitosamente.',
            icon: 'success',
          });
        }
      });
    } else {
      Swal.fire({
        title: 'No eres administrador',
        text: 'No podras eliminar productos',
        icon: 'error',
      });
    }
  }
}
