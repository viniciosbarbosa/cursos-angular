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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../services/customer.service';
import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';
import { City, State } from '../../../../services/models/brasil-api.model';
import { BrasilApiService } from '../../../../services/brasil-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';
import { AsyncPipe } from '@angular/common';
import { Customer } from '../../pages/register/register';

@Component({
  selector: 'app-form',
  imports: [FormModule, NgxMaskDirective, ButtonsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private customerService = inject(CustomerService);
  private brasilApiService = inject(BrasilApiService);

  customer: Customer = Customer.newClient();
  filteredCities$!: Observable<City[]>;
  loadedCities: boolean = false;
  states: State[] = [];
  cities: City[] = [];
  form!: FormGroup;
  maxDate = new Date();

  @Output() submitForm = new EventEmitter<any>();
  @Input() isEdit: boolean = false;

  getCity({ value }: MatSelectChange) {
    if (value) {
      this.brasilApiService
        .getCitiesByState(value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (response) => {
            this.cities = response;
            this.loadedCities = true;
            this.setupCityFilter();
          },
          error: (err) => {
            console.error('Erro ao buscar cidades:', err);
            this.cities = [];
          },
        });
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.getStates();
  }

  private setupCityFilter() {
    const cityControl = this.form.get('city');

    if (cityControl) {
      this.filteredCities$ = cityControl.valueChanges.pipe(
        startWith(''), // Começa com a lista vazia ou total
        map((value) => this._filter(value || ''))
      );
    }
  }

  private _filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) =>
      city.nome.toLowerCase().includes(filterValue)
    );
  }

  getStates() {
    this.brasilApiService
      .getStates()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.states = response;
        },
        error: (err) => {
          console.error('Erro ao buscar estados:', err);
          this.states = [];
        },
      });
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

  onSubmit() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue();
    this.customer = {
      ...this.customer,
      ...formValues,
    };

    this.customerService.saveStorage(this.customer);
  }
}
