import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-categorias-form',
  templateUrl: './categorias-form.component.html',
})
export class CategoriasFormComponent implements OnInit{
  public myForm: FormGroup;
  public isEditMode: boolean = false;
  public id: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      id: [null], // Campo `id` para identificar si se trata de edición.
      nombre: [''],
    });
  }
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          if (id) {
            this.isEditMode = true;
            this.id = id;
            return this.categoriaService.getCategoriaById(id);
          }
          return []; // Si no hay id, no se hace ninguna llamada.
        })
      )
      .subscribe((categoria) => {
        if (categoria) {
          this.myForm.patchValue(categoria); // Llenar el formulario con datos existentes.
        }
      });
  }

  onSave(): void {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.categoriaService.createCategoria(this.myForm.value).subscribe(
        (response) => {
          console.log('Categoria creada:', response);
          this.myForm.reset();
          this.router.navigateByUrl('shopusa/categorias/listado');
        },
        (error) => {
          console.error('Error al crear categoria:', error);
        }
      );
    }
  }

  onUpdate(): void {
    this.categoriaService
      .updateCategoria(this.myForm.value, this.id)
      .subscribe(
        (response) => {
          console.log('Plataforma actualizada:', response);
          this.myForm.reset();
          this.router.navigateByUrl('shopusa/categorias/listado'); // Navegar a la lista de plataformas.
        },
        (error) => {
          console.error('Error al actualizar categoria:', error);
        }
      );
}
}
