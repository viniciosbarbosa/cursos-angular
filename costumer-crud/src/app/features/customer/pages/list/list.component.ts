import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from '../../../../shared/modules/card/card.module';
import { FormModule } from '../../../../shared/modules/form/form.module';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';
import { Customer } from '../register/register';

@Component({
  selector: 'app-list',
  imports: [CardModule, FormModule, ButtonsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private fb = inject(FormBuilder);
  public customerList: Customer[] = [];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit() {
    console.log(this.form);
  }

  ngOnInit(): void {}
}
