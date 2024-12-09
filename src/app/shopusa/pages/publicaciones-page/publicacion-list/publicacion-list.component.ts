import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../../interfaces/publicacion.interface';
import { PublicacionService } from '../../../services/publicacion.service';

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
}
