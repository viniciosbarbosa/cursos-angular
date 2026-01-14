import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CostumerService } from '../../services/costumer.service';
import { Costumer } from '../register/register';

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
  constructor(private service: CostumerService) {}

  costumerList: Costumer[] = [];

  ngOnInit() {
    this.costumerList = this.service.listCostumers('');
    console.log(this.costumerList);
  }
}
