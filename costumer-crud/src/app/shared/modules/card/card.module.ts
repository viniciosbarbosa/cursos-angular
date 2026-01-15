import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCard, MatCardHeader, MatCardContent],
  exports: [MatCard, MatCardHeader, MatCardContent],
})
export class CardModule {}
