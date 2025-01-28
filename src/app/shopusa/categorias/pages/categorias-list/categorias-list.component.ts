import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../services/categoria.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

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
        this.categoriaService.deleteCategoria(id).subscribe((response) => {
          console.log('Categoria eliminada:', response);
          this.categorias = this.categorias.filter(
            (categoria) => categoria.id !== id,
          );
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Categoria eliminada exitosamente.',
          icon: 'success',
        });
      }
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
