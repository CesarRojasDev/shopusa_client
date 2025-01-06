import { Component, OnInit } from '@angular/core';

import { Comision } from '../../../interfaces/comision.interface';
import { ComisionService } from '../../services/comision.service';
import { HttpResponse } from '@angular/common/http';

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
    this.comisionService
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
