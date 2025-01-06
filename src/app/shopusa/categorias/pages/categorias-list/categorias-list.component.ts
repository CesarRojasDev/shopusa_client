import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../../interfaces/comision.interface';
import { CategoriaService } from '../../services/categoria.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
})
export class CategoriasListComponent implements OnInit {
  public categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        console.log(categorias);
      });
  }
  deleteCategoria(id: string): void {
    this.categoriaService.deleteCategoria(id).subscribe((response) => {
      console.log('Categoria eliminada:', response);
      this.categorias = this.categorias.filter(
        (categoria) => categoria.id !== id
      );
    });
  }
  generateXlsx(): void {
    this.categoriaService
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
}
