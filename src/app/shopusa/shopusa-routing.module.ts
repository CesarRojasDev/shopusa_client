import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductosFormComponent } from './pages/productos-page/productos-form/productos-form.component';
import { ProductosListComponent } from './pages/productos-page/productos-list/productos-list.component';
import { ProductoDetailsComponent } from './pages/productos-page/producto-details/producto-details.component';
import { CategoriasListComponent } from './pages/categorias-page/categorias-list/categorias-list.component';
import { CategoriasFormComponent } from './pages/categorias-page/categorias-form/categorias-form.component';
import { SubcategoriasListComponent } from './pages/subcategorias-page/subcategorias-list/subcategorias-list.component';
import { SubcategoriasFormComponent } from './pages/subcategorias-page/subcategorias-form/subcategorias-form.component';
import { PublicacionFormComponent } from './pages/publicaciones-page/publicacion-form/publicacion-form.component';
import { PublicacionListComponent } from './pages/publicaciones-page/publicacion-list/publicacion-list.component';
import { PlataformaFormComponent } from './pages/plataformas-page/plataforma-form/plataforma-form.component';
import { PlataformaListComponent } from './pages/plataformas-page/plataforma-list/plataforma-list.component';
import { ComisionFormComponent } from './pages/comision-page/comision-form/comision-form.component';
import { ComisionListComponent } from './pages/comision-page/comision-list/comision-list.component';

const routes: Routes = [
  {
    path: 'productos',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: ProductosListComponent,
      },
      {
        path: 'crear',
        component: ProductosFormComponent,
      },
      {
        path: 'detalle/:sku',
        component: ProductoDetailsComponent,
      },
    ],
  },
  {
    path: 'categorias',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: CategoriasListComponent,
      },
      {
        path: 'crear',
        component: CategoriasFormComponent,
      },
      {
        path: 'crear/:id',
        component: CategoriasFormComponent,
      }
    ],
  },
  {
    path: 'subcategorias',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: SubcategoriasListComponent,
      },
      {
        path: 'crear',
        component: SubcategoriasFormComponent,
      },
    ],
  },
  {
    path: 'comisiones',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: ComisionListComponent,
      },
      {
        path: 'crear',
        component: ComisionFormComponent,
      },
      {
        path: 'crear/:id',
        component: ComisionFormComponent,
      }
    ],
  },
  {
    path: 'plataformas',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: PlataformaListComponent,
      },
      {
        path: 'crear',
        component: PlataformaFormComponent,
      },
      {
        path: 'crear/:id',
        component: PlataformaFormComponent,
      }
    ],
  },
  {
    path: 'publicaciones',
    component: LayoutPageComponent,
    children: [
      {
        path: 'listado',
        component: PublicacionListComponent,
      },
      {
        path: 'crear',
        component: PublicacionFormComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'productos/listado',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopusaRoutingModule {}
