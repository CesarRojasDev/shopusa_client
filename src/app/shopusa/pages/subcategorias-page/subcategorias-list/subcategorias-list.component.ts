import { Component, OnInit } from '@angular/core';
import { Subcategoria } from '../../../interfaces/subcategoria.interface';
import { SubCategoriaService } from '../../../services/subCategoria.service';

@Component({
  selector: 'app-subcategorias-list',
  templateUrl: './subcategorias-list.component.html',
})
export class SubcategoriasListComponent implements OnInit {

  public subcategorias: Subcategoria[] = [];

  constructor(private subcategoriaService: SubCategoriaService) {}
  ngOnInit(): void {
    this.subcategoriaService
      .getSubCategorias()
      .subscribe((subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
        console.log(subcategorias);
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
