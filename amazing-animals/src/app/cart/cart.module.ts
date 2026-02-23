import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CartViewComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class CartModule {}
