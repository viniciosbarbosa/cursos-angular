import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent implements OnInit {
  constructor() {}

  camposForm!: FormGroup;

  createForm() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }

  save() {
    console.log(this.camposForm.value);
  }

  ngOnInit(): void {
    this.createForm();
  }
}
