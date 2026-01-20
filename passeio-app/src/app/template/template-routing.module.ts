import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        pathMatch: 'full',
        data: {
          titulo: 'Categorias',
          descricao: 'Gerencie as categorias dos lugares',
        },
        loadChildren: () =>
          import('../categorias/categorias.module').then(
            (m) => m.CategoriasModule,
          ),
      },
      {
        path: 'lugares',
        pathMatch: 'full',
        loadChildren: () =>
          import('../lugares/lugares.module').then((m) => m.LugaresModule),
        data: {
          titulo: 'Lugares',
          descricao: 'Gerencie o cadastro de lugares',
        },
      },
      {
        path: 'galeria',
        pathMatch: 'full',
        loadChildren: () =>
          import('../galeria/galeria.module').then((m) => m.GaleriaModule),
        data: {
          titulo: 'Lista de lugares',
          descricao: 'Descubra novos lugares para visitar',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateRoutingModule {}
