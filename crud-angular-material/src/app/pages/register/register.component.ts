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

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
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
    private router: Router
  ) {}
  costumer: Costumer = Costumer.newClient();
  isThereId: boolean = false;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        this.isThereId = true;
        const costumerFound = this.service.getCostumerById(id);
        if (costumerFound) {
          this.costumer = costumerFound;
        }
      } else {
        this.isThereId = false;
      }
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

  save() {
    if (this.isThereId) {
      this.updateCostumer(this.costumer);
      this.router.navigate(['/search']);
    } else {
      this.service.saveStorage(this.costumer);
      this.costumer = Costumer.newClient();
    }
  }
}
