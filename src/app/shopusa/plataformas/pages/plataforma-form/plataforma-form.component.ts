import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { switchMap } from 'rxjs';

import { PlataformaService } from '../../services/plataforma.service';

@Component({
  selector: 'app-plataforma-form',
  templateUrl: './plataforma-form.component.html',
})
export class PlataformaFormComponent implements OnInit {
  public myForm: FormGroup;
  public isEditMode: boolean = false;
  public id: string = '';

  constructor(
    private plataformaService: PlataformaService,
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
    // Detectar si hay un `id` en los parámetros de la ruta para el modo edición.
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          if (id) {
            this.isEditMode = true;
            this.id = id;
            return this.plataformaService.getPlataformaById(id);
          }
          return []; // Si no hay id, no se hace ninguna llamada.
        })
      )
      .subscribe((plataforma) => {
        if (plataforma) {
          this.myForm.patchValue(plataforma); // Llenar el formulario con datos existentes.
        }
      });
  }

  onSave(): void {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.plataformaService.createPlataforma(this.myForm.value).subscribe(
        (response) => {
          console.log('Plataforma creada:', response);
          this.myForm.reset();
          this.router.navigateByUrl('shopusa/plataformas/listado');
        },
        (error) => {
          console.error('Error al crear plataforma:', error);
        }
      );
    }
  }

  onUpdate(): void {
    this.plataformaService
      .updatePlataforma(this.myForm.value, this.id)
      .subscribe(
        (response) => {
          console.log('Plataforma actualizada:', response);
          this.myForm.reset();
          this.router.navigateByUrl('shopusa/plataformas/listado'); // Navegar a la lista de plataformas.
        },
        (error) => {
          console.error('Error al actualizar plataforma:', error);
        }
      );
  }
}
