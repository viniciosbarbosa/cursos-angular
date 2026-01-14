import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CostumerService } from '../../services/costumer.service';
import { Costumer } from '../register/register';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  snack: MatSnackBar = inject(MatSnackBar);
  constructor(private service: CostumerService, private router: Router) {}
  nameCostumer: string = '';
  btnDeleteToggle: string | null = null;
  tableColumns: string[] = [
    'id',
    'name',
    'cpf',
    'birthDate',
    'email',
    'actions',
  ];

  costumerList: Costumer[] = [];

  ngOnInit() {
    this.costumerList = this.service.listCostumers('');
  }

  toggleDelete(id: string) {
    this.btnDeleteToggle = this.btnDeleteToggle === id ? null : id;
  }
  showMessage(message: string) {
    this.snack.open(message, 'OK', { duration: 3000 });
  }

  deleteCostumer(id: string) {
    this.costumerList = this.service.deleteCostumer(id);
    this.showMessage('Deletado com sucesso!');
  }

  searchCostumer() {
    this.costumerList = this.service.listCostumers(this.nameCostumer);
  }

  editCostumer(id: string) {
    this.router.navigate(['/register'], { queryParams: { id: id } });
  }
}
