import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

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
      this.searchTerm = term;
      this.page = 0; // Reiniciar a la primera página
      this.applyFilters();
    });
  }

  generateXlsx(): void {
    this.productService
      .generateXlsx()
      .subscribe((response: HttpResponse<Blob>) => {
        const blob = response.body!;
        const fileName = response.headers.get('X-File-Name')!;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  loadProducts(): void {
    this.productService
      .getProductsPaginados(this.page, this.size, this.sort)
      .subscribe((response) => {
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.updatePages();
      });
  }

  loadProductsByName(name: string): void {
    this.productService
      .getProductsByName(name, this.page, this.size, this.sort)
      .subscribe((response: ProductResponse) => {
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.updatePages();
      });
  }

  loadProductsBySubcategory(id: string): void {
    this.productService
      .getProductsBySubcategory(id, this.page, this.size, this.sort)
      .subscribe((response: ProductResponse) => {
        this.products = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.updatePages();
      });
  }

  loadSubcategories(): void {
    this.subcategoriaService.getSubCategorias().subscribe((subcategories) => {
      this.subcategorias = subcategories;
    });
  }

  onNameSearch(event: any): void {
    const term = event.target.value.trim();
    this.searchSubject.next(term);
  }

  onSubcategoryChange(event: any): void {
    this.selectedSubcategory = event.target.value;
    this.page = 0; // Reiniciar a la primera página
    this.applyFilters();
  }

  onSortChange(event: any): void {
    this.sort = event.target.value;
    this.page = 0; // Reiniciar a la primera página
    this.applyFilters();
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.applyFilters();
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.applyFilters();
    }
  }

  goToPage(pageIndex: number): void {
    this.page = pageIndex;
    this.applyFilters();
  }

  changePageSize(size: number): void {
    this.size = size;
    this.page = 0; // Reiniciar a la primera página
    this.applyFilters();
  }

  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  applyFilters(): void {
    if (this.selectedSubcategory !== 'todos') {
      this.loadProductsBySubcategory(this.selectedSubcategory);
    } else if (this.searchTerm) {
      this.loadProductsByName(this.searchTerm);
    } else {
      this.loadProducts();
    }
  }
}
