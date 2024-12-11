import { Component, OnInit } from '@angular/core';

import { Producto } from '../../../interfaces/producto.interface';
import { ProductService } from '../../services/product.service';
import { Subcategoria } from '../../../interfaces/subcategoria.interface';
import { SubcategoriaService } from '../../../subcategorias/services/subcategoria.service';

@Component({
  selector: 'shopusa-productos-list',
  templateUrl: './productos-list.component.html',
})
export class ProductosListComponent implements OnInit {
  products: Producto[] = [];
  subcategorias: Subcategoria[] = [];
  totalElements: number = 0; // Total de elementos
  totalPages: number = 0; // Total de páginas
  page: number = 0; // Página actual
  size: number = 15; // Tamaño de página
  sort: string = 'nombre,asc'; // Ordenación por defecto
  pages: number[] = []; // Array dinámico para las páginas de paginación
  selectedSubcategory: string = 'todos'; // Subcategoría seleccionada

  constructor(
    private productService: ProductService,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubcategories();
  }

  loadProducts(): void {
    // Llamada al servicio con el filtro por subcategoría
    this.productService
      .getProducts(this.page, this.size, this.sort )
      .subscribe((response) => {
        console.log(response);
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.updatePages(); // Actualizar páginas dinámicas
      });
  }

  loadSubcategories(): void {
    // Obtener las subcategorías disponibles
    this.subcategoriaService.getSubCategorias().subscribe((subcategories) => {
      this.subcategorias = subcategories;
    });
  }

  // Cambiar la subcategoría seleccionada
  onSubcategoryChange(event: any): void {
    this.selectedSubcategory = event.target.value;
    this.page = 0; // Reiniciar a la primera página cuando se cambia la subcategoría
    this.loadProducts(); // Volver a cargar los productos con la nueva subcategoría
  }

  // Cambiar el criterio de ordenación
  onSortChange(event: any): void {
    this.sort = event.target.value; // Obtener el valor seleccionado
    this.page = 0; // Reiniciar a la primera página cuando se cambia el orden
    this.loadProducts(); // Volver a cargar los productos con la nueva ordenación
  }

  // Métodos para manejar la paginación
  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }

  goToPage(pageIndex: number): void {
    this.page = pageIndex;
    this.loadProducts();
  }

  changePageSize(size: number): void {
    this.size = size;
    this.page = 0; // Reiniciar a la primera página
    this.loadProducts();
  }

  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
