import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () =>
      import('./productos/productos.module').then((m) => m.ProductosModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'subcategorias',
    loadChildren: () =>
      import('./subcategorias/subcategorias.module').then(
        (m) => m.SubcategoriasModule
      ),
  },
  {
    path: 'comisiones',
    loadChildren: () =>
      import('./comision/comision.module').then((m) => m.ComisionModule),
  },
  {
    path: 'plataformas',
    loadChildren: () =>
      import('./plataformas/plataformas.module').then(
        (m) => m.PlataformasModule
      ),
  },
  {
    path: 'publicaciones',
    loadChildren: () =>
      import('./publicaciones/publicaciones.module').then(
        (m) => m.PublicacionesModule
      ),
  },
  {
    path: 'imagenes',
    loadChildren: () =>
      import('./imagenes/imagenes.module').then((m) => m.ImagenesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopusaRoutingModule {}
