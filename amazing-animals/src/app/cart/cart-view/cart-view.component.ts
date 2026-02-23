import { Product } from './../../product/models/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-view',
  standalone: false,
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  cleanCart(): void {
    this.cartService.cleanCart().subscribe(() => {
      this.getCartItems();
    });
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      console.log(items);
      this.cartItems = items;
    });
  }
}
