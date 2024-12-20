import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../interfaces/comision.interface';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CategoriaService } from '../../../categorias/services/categoria.service';
import { SubcategoriaService } from '../../services/subcategoria.service';

@Component({
  selector: 'app-subcategorias-form',
  templateUrl: './subcategorias-form.component.html',
})
export class SubcategoriasFormComponent {
  public myForm: FormGroup;
  public categorias: Categoria[] = [];
  public id: string = '';
  public isEditMode: boolean = false;

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
    // Cargar las categorías
    this.categoriaService
      .getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
    

  }
  onSave(): void {
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
