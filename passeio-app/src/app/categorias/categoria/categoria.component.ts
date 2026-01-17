import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent implements OnInit {
  constructor(private service: CategoriaService) {}

  camposForm!: FormGroup;

  createForm() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }

  save() {
    this.camposForm.markAllAsTouched();

    const params: Categoria = {
      nome: this.camposForm.value.nome,
      descricao: this.camposForm.value.descricao,
    };

    if (this.camposForm.valid) {
      this.service.salvar(this.camposForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.camposForm.reset();
        },
        error: (error) => console.log(error),
      });
    }
  }

  ngOnInit(): void {
    this.createForm();
  }
}
