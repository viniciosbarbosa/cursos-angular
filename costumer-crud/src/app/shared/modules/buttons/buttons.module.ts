import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconButton],
  exports: [MatButtonModule, MatIconButton, MatIconModule],
})
export class ButtonsModule {}
