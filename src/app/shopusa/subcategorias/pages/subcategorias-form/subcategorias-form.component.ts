import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';

@Component({
  selector: 'app-subcategorias-form',
  templateUrl: './subcategorias-form.component.html',
})
export class SubcategoriasFormComponent {
  public categorias: Categoria[] = [];
  public id: string = '';
  public isEditMode: boolean = false;
  public myForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private subCategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      id: [null],
      nombre: [''],
      categoriaId: [''],
      codigo: [''],
      pesoGramos: [''],
      ancho: [''],
      alto: [''],
      largo: [''],
      garantia: [''],
    });
  }

  ngOnInit(): void {
    this.categoriaService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
      this.activateRoute.params.subscribe(({ id }) => {
        if (id) {
          this.isEditMode = true;
          this.id = id;
          this.subCategoriaService
            .getSubcategoriaById(id)
            .subscribe((subcategoria: any) => {
              if (subcategoria) {
                this.myForm.patchValue(subcategoria);
              }
            });
        }
      });
  }
  onSave(): void {
    if(this.isEditMode){
      this.onUpdate();
    }else{
      this.subCategoriaService.createSubcategoria(this.myForm.value).subscribe(
        (response) => {
          console.log('Subcategoria creada:', response);
          this.router.navigateByUrl('shopusa/subcategorias/listado'); // Redirigir a la lista de subcategorias
        },
        (error) => {
          console.error('Error al crear subcategoria:', error);
        }
      );
    }
  }

  onUpdate(): void {
    this.subCategoriaService.updateSubcategoria(this.myForm.value, this.id).subscribe(
      (response) => {
        console.log('Subcategoria actualizada:', response);
        this.router.navigateByUrl('shopusa/subcategorias/listado'); // Redirigir a la lista de subcategorias
      },
      (error) => {
        console.error('Error al actualizar subcategoria:', error);
      }
    );
  }
  onReset(): void {
    this.myForm.reset();
  }
}
