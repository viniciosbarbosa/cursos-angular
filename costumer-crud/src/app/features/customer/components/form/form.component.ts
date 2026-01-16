import { Customer } from './../../pages/register/register';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormModule } from '../../../../shared/modules/form/form.module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgxMaskDirective } from 'ngx-mask';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonsModule } from '../../../../shared/modules/buttons/buttons.module';
import { City, State } from '../../../../services/models/brasil-api.model';
import { BrasilApiService } from '../../../../services/brasil-api.service';
import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-form',
  imports: [FormModule, NgxMaskDirective, ButtonsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private brasilApiService = inject(BrasilApiService);

  filteredCities$!: Observable<City[]>;
  loadedCities: boolean = false;
  states: State[] = [];
  cities: City[] = [];
  form!: FormGroup;
  maxDate = new Date();
  customer!: Customer;

  @Output() submitForm = new EventEmitter<any>();
  @Input() customerData: Customer = {};

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
    if (this.customerData && this.customerData.id) {
      this.customer = { ...this.customerData };
    } else {
      this.customer = Customer.newClient();
    }
    this.createForm();
    this.getStates();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerData'] && this.form) {
      const data = changes['customerData'].currentValue;
      if (data && Object.keys(data).length > 0) {
        this.form.patchValue(data);
      } else {
        this.form.reset();
      }
    }
  }

  private setupCityFilter() {
    const cityControl = this.form.get('city');

    if (cityControl) {
      this.filteredCities$ = cityControl.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value || ''))
      );
    }
  }

  private filter(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) =>
      city.nome.toLowerCase().includes(filterValue)
    );
  }

  private getStates() {
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

  private createForm() {
    this.form = this.fb.group({
      name: [this.customerData?.name ?? '', [Validators.required]],
      email: [
        this.customerData?.email ?? '',
        [Validators.required, Validators.email],
      ],
      cpf: [this.customerData?.cpf ?? '', [Validators.required]],
      phone: [this.customerData?.phone ?? '', [Validators.required]],
      birthDay: [this.customerData?.birthDay ?? '', [Validators.required]],
      state: [this.customerData?.state ?? '', [Validators.required]],
      city: [this.customerData?.city ?? '', [Validators.required]],
    });
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue();
    this.customer = {
      ...this.customer,
      ...formValues,
    };

    this.submitForm.emit(this.customer);
  }
}
