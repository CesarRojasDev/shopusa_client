import { Component, OnInit } from '@angular/core';

import { Plataforma } from '../../../interfaces/plataforma.interface';
import { PlataformaService } from '../../services/plataforma.service';

@Component({
  selector: 'app-plataforma-list',
  templateUrl: './plataforma-list.component.html',
})
export class PlataformaListComponent implements OnInit {
  public plataformas: Plataforma[] = [];
  constructor(
    private plataformaService: PlataformaService
  ) {}

  ngOnInit(): void {
    this.plataformaService.getPlataformas().subscribe((plataformas) => {
      this.plataformas = plataformas;
    });
  }
  deletePlataforma(id: string): void {
    this.plataformaService.deletePlataforma(id).subscribe((response) => {
      console.log('Plataforma eliminada:', response);
      this.plataformas = this.plataformas.filter(
        (plataforma) => plataforma.id !== id
      );
    });
  }
   generateXlsx(): void {
    this.plataformaService.generateXlsx().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob); // Crear URL para descargar el archivo
      const a = document.createElement('a'); // Crear elemento <a> para el archivo
      a.href = url; // Asignar URL al elemento <a>
      a.download = 'plataformas.xlsx'; // Nombre del archivo
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Desconectar la URL
    });
  }
}
