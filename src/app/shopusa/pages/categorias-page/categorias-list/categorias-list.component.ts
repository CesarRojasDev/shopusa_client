import { Component, OnInit } from '@angular/core';

import { Categoria, Comision } from '../../../interfaces/comision.interface';
import { ComisionService } from '../../../services/comision.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
})
export class CategoriasListComponent implements OnInit {

  public categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
  ){

    
  }
  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((categorias: Categoria[]) => { 
      this.categorias = categorias;
      console.log(categorias)
    })
  }
  deleteCategoria(id: string): void {
    this.categoriaService.deleteCategoria(id).subscribe((response) => {
      console.log('Categoria eliminada:', response);
      this.categorias = this.categorias.filter(
        (categoria) => categoria.id !== id
      );
    });
  }
}
