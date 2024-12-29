import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import { Producto } from '../../../interfaces/producto.interface';
import { ProductResponse } from '../../../interfaces/product-response.interface';
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
  size: number = 16; // Tamaño de página
  sort: string = 'nombre,asc'; // Ordenación por defecto
  pages: number[] = []; // Array dinámico para las páginas de paginación
  selectedSubcategory: string = 'todos'; // Subcategoría seleccionada
  searchTerm: string = ''; // Término de búsqueda
  private searchSubject: Subject<string> = new Subject<string>(); // Subject para manejar el debounce

  constructor(
    private productService: ProductService,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubcategories();

      this.searchSubject.pipe(debounceTime(300)).subscribe((term: string) => {
      this.loadProductsByName(term);
    });
  }

  generateXlsx(): void {
    this.productService.generateXlsx().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob); // Crear URL para descargar el archivo
      const a = document.createElement('a'); // Crear elemento <a> para el archivo
      a.href = url; // Asignar URL al elemento <a>
      a.download = 'productos.xlsx'; // Nombre del archivo
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Desconectar la URL
    }
    );
  }
  

  loadProducts(): void {
    // Llamada al servicio con el filtro por subcategoría
    this.productService
      .getProductsPaginados(this.page, this.size, this.sort )
      .subscribe((response) => {
        console.log(response);
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.updatePages(); // Actualizar páginas dinámicas
      });
  }

  loadProductsByName(name: string): void {
    // Llamada al servicio con el filtro por subcategoría
    this.productService
      .getProductsByName(name)
      .subscribe((response: ProductResponse) => {
        console.log(response);
        this.products = response.content;
      });
  }

  loadSubcategories(): void {
    // Obtener las subcategorías disponibles
    this.subcategoriaService.getSubCategorias().subscribe((subcategories) => {
      this.subcategorias = subcategories;
    });
  }

  onNameSearch(event: any): void {
    const term = event.target.value.trim();
    this.searchSubject.next(term); // Emitir el término de búsqueda
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
