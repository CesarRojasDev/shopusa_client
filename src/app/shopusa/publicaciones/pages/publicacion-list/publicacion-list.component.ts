import { Component, OnInit } from '@angular/core';

import { Publicacion } from '../../../interfaces/publicacion.interface';
import { PublicacionService } from '../../services/publicacion.service';

@Component({
  selector: 'app-publicacion-list',
  templateUrl: './publicacion-list.component.html',
})
export class PublicacionListComponent implements OnInit {

  public publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) {}
  ngOnInit(): void {
    this.publicacionService.getPublicaciones().subscribe((publicaciones: Publicacion[]) => { 
      this.publicaciones = publicaciones;
      console.log(publicaciones)
    })
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
    this.publicacionService.generateXlsx().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob); // Crear URL para descargar el archivo
      const a = document.createElement('a'); // Crear elemento <a> para el archivo
      a.href = url; // Asignar URL al elemento <a>
      a.download = 'publicaciones.xlsx'; // Nombre del archivo
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Desconectar la URL
    });
  }
}
