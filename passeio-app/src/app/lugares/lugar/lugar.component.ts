import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../service/lugar.service';
@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss',
})
export class LugarComponent implements OnInit {
  camposForm!: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private lugarService: LugarService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllCategorias();
  }

  getAllCategorias() {
    this.categoriaService.obterTodas().subscribe((response) => {
      console.log(response);
      this.categorias = response;
    });
  }

  save() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.lugarService.salvar(this.camposForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.camposForm.reset();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  createForm() {
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      localizacao: new FormControl('', [Validators.required]),
      urlFoto: new FormControl('', [Validators.required]),
      avaliacao: new FormControl('', [Validators.required]),
    });
  }
}
