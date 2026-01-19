import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../lugares/service/lugar.service';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss',
})
export class GaleriaComponent implements OnInit {
  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService,
  ) {}
  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';

  ngOnInit(): void {
    this.getAllCategorias();
    this.getAllLugares();
  }

  getAllLugares() {
    this.lugarService.obterTodos().subscribe((response) => {
      this.lugares = response;
    });
  }

  getAllCategorias() {
    this.categoriaService.obterTodas().subscribe((response) => {
      this.categoriasFiltro = response;
    });
  }

  getTotalEstrelas(lugar: Lugar): string {
    return (
      '&#9733;'.repeat(+(lugar.avaliacao || 0)) +
      '&#9734;'.repeat(5 - +(lugar.avaliacao || 0))
    );
  }

  filter() {
    this.lugarService
      .filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe((response) => {
        this.lugares = response;
      });
  }
}
