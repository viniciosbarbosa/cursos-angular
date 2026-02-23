import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

@NgModule({
  declarations: [CartViewComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class CartModule {}
