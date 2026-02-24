import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
  ],
})
export class ProductModule {}
