import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriaComponent } from './categoria/categoria.component';

@NgModule({
  declarations: [CategoriaComponent],
  imports: [CommonModule, CategoriasRoutingModule, ReactiveFormsModule],
})
export class CategoriasModule {}
