import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Produto {
  nome: string;
  valor: number;
  imagem: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  produtos: Produto[] = [
    {
      nome: 'Camiseta Oversized Básica',
      valor: 89.9,
      imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    },
    {
      nome: 'Tênis Casual Branco',
      valor: 249.0,
      imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
    {
      nome: 'Moletom Canguru Cinza',
      valor: 169.9,
      imagem: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
    },
    {
      nome: 'Calça Jeans Mom Fit',
      valor: 199.9,
      imagem: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&q=80',
    },
    {
      nome: 'Boné Trucker Preto',
      valor: 59.9,
      imagem: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
    },
    {
      nome: 'Jaqueta Jeans Destroyed',
      valor: 299.0,
      imagem: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    },
    {
      nome: 'Óculos de Sol Quadrado',
      valor: 129.9,
      imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    },
    {
      nome: 'Mochila Urbana Preta',
      valor: 189.9,
      imagem: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    },
  ];
}
