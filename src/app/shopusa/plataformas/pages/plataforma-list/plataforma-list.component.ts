import { Component, OnInit } from '@angular/core';

import { Plataforma } from '../../../interfaces/plataforma.interface';
import { PlataformaService } from '../../services/plataforma.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-plataforma-list',
  templateUrl: './plataforma-list.component.html',
})
export class PlataformaListComponent implements OnInit {
  public plataformas: Plataforma[] = [];
  constructor(private plataformaService: PlataformaService) {}

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
    this.plataformaService
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
