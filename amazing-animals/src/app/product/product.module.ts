import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, ProductRoutingModule, MatCardModule],
})
export class ProductModule {}
