import { Component, OnInit } from '@angular/core';

import { Comision } from '../../../interfaces/comision.interface';
import { ComisionService } from '../../services/comision.service';

@Component({
  selector: 'app-comision-list',
  templateUrl: './comision-list.component.html',
})
export class ComisionListComponent implements OnInit {
  public comisiones: Comision[] = [];

  constructor(private comisionService: ComisionService) {}

  ngOnInit(): void {
    this.comisionService.getComisiones().subscribe((comisiones: Comision[]) => {
      this.comisiones = comisiones;
      console.log(comisiones);
    });
  }
  deleteComision(id: string): void {
    this.comisionService.deleteComision(id).subscribe((response) => {
      console.log('Comision eliminada:', response);
      this.comisiones = this.comisiones.filter(
        (comision) => comision.id !== id
      );
    });
  }
  generateXlsx(): void {
    this.comisionService.generateXlsx().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob); // Crear URL para descargar el archivo
      const a = document.createElement('a'); // Crear elemento <a> para el archivo
      a.href = url; // Asignar URL al elemento <a>
      a.download = 'comisiones.xlsx'; // Nombre del archivo
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Desconectar la URL
    });
  }
}
