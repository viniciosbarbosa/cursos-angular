import { BrasilApiService } from './../../services/brasil-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Costumer } from './register';
import { CostumerService } from '../../services/costumer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { City, State } from '../../models/brasilApi.models';
import { state } from '@angular/animations';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private service: CostumerService,
    private route: ActivatedRoute,
    private router: Router,
    private brasilApiService: BrasilApiService
  ) {}
  states: State[] = [];
  cities: City[] = [];
  snack: MatSnackBar = inject(MatSnackBar);
  costumer: Costumer = Costumer.newClient();
  isThereId: boolean = false;
  ngOnInit(): void {
    this.getUFS();
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        this.isThereId = true;
        const costumerFound = this.service.getCostumerById(id);
        if (costumerFound) {
          this.costumer = costumerFound;
        }
        if (this.costumer.state) {
          const event = { value: this.costumer.state };
          this.getCity(event as MatSelectChange);
        }
      } else {
        this.isThereId = false;
      }
    });
  }

  getCity(event: MatSelectChange) {
    const target = event.value;
    this.brasilApiService.getCitiesByState(target).subscribe((response) => {
      this.cities = response;
    });
  }

  updateCostumer(costumer: Costumer) {
    const storage = this.service.getStorage();
    storage.forEach((c) => {
      if (c.id === costumer.id) {
        {
          Object.assign(c, costumer);
        }
      }
    });

    this.service.updateCostomer(storage);
  }

  getUFS() {
    this.brasilApiService.getStates().subscribe((response) => {
      this.states = response;
    });
  }

  onStateChange(event: any) {}

  save() {
    if (this.isThereId) {
      this.updateCostumer(this.costumer);
      this.router.navigate(['/search']);
      this.showMessage('Salvo com sucesso!');
    } else {
      this.service.saveStorage(this.costumer);
      this.costumer = Costumer.newClient();
      this.showMessage('Atualizado com sucesso!');
    }
  }

  showMessage(message: string) {
    this.snack.open(message, 'OK', { duration: 3000 });
  }
}
