import { Component } from '@angular/core';
import { CardModule } from '../../../../shared/modules/card/card.module';

import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-register',
  imports: [CardModule, ButtonsModule, FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {}
