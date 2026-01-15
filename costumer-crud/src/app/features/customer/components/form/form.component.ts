import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormModule } from '../../../../shared/modules/form/form.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgxMaskDirective } from 'ngx-mask';
import { MatSelectChange } from '@angular/material/select';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../services/customer.service';
import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';

@Component({
  selector: 'app-form',
  imports: [FormModule, NgxMaskDirective, ButtonsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private service = inject(CustomerService);

  @Output() submitForm = new EventEmitter<any>();
  @Input() isEdit: boolean = false;
  form!: FormGroup;

  getCity(event: MatSelectChange) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      birthDay: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.verifyChanges());
  }

  verifyChanges() {}

  onSubmit() {}
}
