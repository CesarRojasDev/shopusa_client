import { Component, OnInit } from '@angular/core';

import { Publicacion } from '../../../interfaces/publicacion.interface';
import { PublicacionService } from '../../services/publicacion.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicacion-list',
  templateUrl: './publicacion-list.component.html',
})
export class PublicacionListComponent implements OnInit {
  public publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) {}
  ngOnInit(): void {
    this.publicacionService
      .getPublicaciones()
      .subscribe((publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;
      });
  }
  deletePublicacion(id: string): void {
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
        this.publicacionService.deletePublicacion(id).subscribe((response) => {
          this.publicaciones = this.publicaciones.filter(
            (publicacion) => publicacion.id !== id,
          );
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Publicacion eliminada exitosamente.',
          icon: 'success',
        });
      }
    });
  }
  generateXlsx(): void {
    this.publicacionService
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
