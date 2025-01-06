import { Component, OnInit } from '@angular/core';

import { Publicacion } from '../../../interfaces/publicacion.interface';
import { PublicacionService } from '../../services/publicacion.service';
import { HttpResponse } from '@angular/common/http';

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
        console.log(publicaciones);
      });
  }
  deletePublicacion(id: string): void {
    this.publicacionService.deletePublicacion(id).subscribe((response) => {
      console.log('Publicacion eliminada:', response);
      this.publicaciones = this.publicaciones.filter(
        (publicacion) => publicacion.id !== id
      );
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
