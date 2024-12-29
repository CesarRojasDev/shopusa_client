import { Component, OnInit } from '@angular/core';

import { Categoria } from '../../../interfaces/comision.interface';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
})
export class CategoriasListComponent implements OnInit {
  public categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
        console.log(categorias);
      });
  }
  deleteCategoria(id: string): void {
    this.categoriaService.deleteCategoria(id).subscribe((response) => {
      console.log('Categoria eliminada:', response);
      this.categorias = this.categorias.filter(
        (categoria) => categoria.id !== id
      );
    });
  }
   generateXlsx(): void {
    this.categoriaService.generateXlsx().subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob); // Crear URL para descargar el archivo
      const a = document.createElement('a'); // Crear elemento <a> para el archivo
      a.href = url; // Asignar URL al elemento <a>
      a.download = 'categorias.xlsx'; // Nombre del archivo
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Desconectar la URL
    });
  }
}
