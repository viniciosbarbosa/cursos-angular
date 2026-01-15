import { Component } from '@angular/core';
import { CardModule } from '../../shared/modules/card/card.module';

import { ButtonsModule } from '../../shared/modules/buttons/buttons.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CardModule, RouterModule, ButtonsModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
