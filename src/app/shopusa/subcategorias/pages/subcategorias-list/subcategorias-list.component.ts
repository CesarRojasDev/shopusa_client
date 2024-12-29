import { Component, OnInit } from '@angular/core';

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
        console.log(subcategorias);
      });
  }
  generateXlsx(): void {
    this.subcategoriaService.generateXlsx().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob); // Crear URL para descargar el archivo
      const a = document.createElement('a'); // Crear elemento <a> para el archivo
      a.href = url; // Asignar URL al elemento <a>
      a.download = 'subcategorias.xlsx'; // Nombre del archivo
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Desconectar la URL
    });
  }

  deleteSubcategoria(id: string): void {
    this.subcategoriaService.deleteSubcategoria(id).subscribe((response) => {
      console.log('Subcategoria eliminada:', response);
      this.subcategorias = this.subcategorias.filter(
        (subcategoria) => subcategoria.id !== id
      );
    });
  }
}
