import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  @ViewChild('barChart', { static: true })
  barChart!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  private readonly dados = [
    { categoria: 'eletrodomesticos', valor: 1500 },
    { categoria: 'eletronicos', valor: 2500 },
    { categoria: 'vestuario', valor: 3500 },
    { categoria: 'moveis', valor: 4500 },
  ];

  ngAfterViewInit(): void {
    const labels = this.dados.map((item) => item.categoria);
    const valores = this.dados.map((item) => item.valor);

    // se recriar (hot reload), destrói antes
    this.chart?.destroy();

    this.chart = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Vendas por Categoria',
            data: valores,
            backgroundColor: 'rgba(31, 72, 146, 0.6)',
            borderColor: 'rgba(31, 72, 146, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
