import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    AppRoutingModule,
    MatButtonModule,
    RouterLink,
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
