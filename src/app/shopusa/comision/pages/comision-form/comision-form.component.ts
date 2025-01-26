import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { Comision } from '../../../interfaces/comision.interface';
import { ComisionService } from '../../services/comision.service';
import { Plataforma } from '../../../interfaces/plataforma.interface';
import { PlataformaService } from '../../../plataformas/services/plataforma.service';

@Component({
  selector: 'app-comision-form',
  templateUrl: './comision-form.component.html',
})
export class ComisionFormComponent {
  public categorias: Categoria[] = [];
  public comisiones: Comision[] = [];
  public id: string = '';
  public isEditMode: boolean = false;
  public myForm: FormGroup;
  public plataformas: Plataforma[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private comisionService: ComisionService,
    private fb: FormBuilder,
    private plataformaService: PlataformaService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      id: [null],
      valor: ['',[Validators.required, Validators.min(0.1)]],
      categoriaId: ['' ,Validators.required],
      plataformaId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Cargar las plataformas y categorías
    this.categoriaService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
    this.plataformaService
      .getPlataformas()
      .subscribe((plataformas) => (this.plataformas = plataformas));

    // Si estamos en modo edición, obtener la comisión correspondiente
    this.activateRoute.params.subscribe(({ id }) => {
      if (id) {
        this.isEditMode = true;
        this.id = id;
        this.comisionService.getComisionById(id).subscribe((comision) => {
          if (comision) {
            this.myForm.patchValue({
              valor: comision.valor,
              categoriaId: comision.categoria.id,
              plataformaId: comision.plataforma.id,
            });
          }
        });
      }
    });
  }

  onSave(): void {
    if (this.isEditMode) {
      this.onUpdate();
    } else {
      this.comisionService
        .createComision(this.myForm.value)
        .subscribe((response) => {
          console.log('Comisión creada:', response);
          this.router.navigateByUrl('shopusa/comisiones/listado'); // Redirigir a la lista
        });
    }
  }

  onUpdate(): void {
    this.comisionService
      .updateComision(this.myForm.value, this.id)
      .subscribe((response) => {
        console.log('Comisión actualizada:', response);
        this.router.navigateByUrl('shopusa/comisiones/listado'); // Redirigir a la lista
      });
  }
}
