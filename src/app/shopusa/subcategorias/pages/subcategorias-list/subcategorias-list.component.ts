import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import Swal from 'sweetalert2';

import { Subcategoria } from '../../../interfaces/subcategoria.interface';
import { SubcategoriaService } from '../../../subcategorias/services/subcategoria.service';

@Component({
  selector: 'app-subcategorias-list',
  templateUrl: './subcategorias-list.component.html',
})
export class SubcategoriasListComponent implements OnInit {
  public subcategorias: Subcategoria[] = [];

  constructor(private subcategoriaService: SubcategoriaService) {}
  ngOnInit(): void {
    this.subcategoriaService
      .getSubCategorias()
      .subscribe((subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
      });
  }
  deleteSubcategoria(id: string): void {
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
        this.subcategoriaService
          .deleteSubcategoria(id)
          .subscribe((response) => {
            console.log('Subcategoria eliminada:', response);
            this.subcategorias = this.subcategorias.filter(
              (subcategoria) => subcategoria.id !== id,
            );
          });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Subcategoria eliminada exitosamente.',
          icon: 'success',
        });
      }
    });
  }
  generateXlsx(): void {
    this.subcategoriaService
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
