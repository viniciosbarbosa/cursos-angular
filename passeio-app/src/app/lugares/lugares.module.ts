import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugaresRoutingModule } from './lugares-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LugarComponent } from './lugar/lugar.component';

@NgModule({
  declarations: [LugarComponent],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LugaresModule {}
