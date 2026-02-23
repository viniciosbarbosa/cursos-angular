import { Product } from './../../product/models/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Cart } from './models/cart';

@Component({
  selector: 'app-cart-view',
  standalone: false,
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.scss',
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  itemsAndQuantity: Cart[] = [];
  selectedItems: Set<number> = new Set();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  cleanCart(): void {
    this.cartService.cleanCart().subscribe(() => {
      this.getCartItems();
    });
  }
  removeFromCart(item: Product) {
    const index = this.itemsAndQuantity.findIndex(
      (i) => i.product.id === item.id,
    );
    if (index > -1) {
      this.itemsAndQuantity.splice(index, 1);
      this.calculateTotal();
    }
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe((response) => {
      const items = response.map((product) => ({
        ...product,
        image_url: 'assets/images/' + product.image_url,
      }));
      console.log(items);
      this.cartItems = items;

      this.itemsAndQuantity = [];
      items.forEach((item) => {
        const existingItem = this.itemsAndQuantity.find(
          (i) => i.product.id === item.id,
        );
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.itemsAndQuantity.push({ product: item, quantity: 1 });
        }
      });
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.totalPrice = this.itemsAndQuantity.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  increaseQuantity(item: Product): void {
    const existingItem = this.itemsAndQuantity.find(
      (i) => i.product.id === item.id,
    );
    if (existingItem) {
      existingItem.quantity++;
      this.calculateTotal();
    }
  }

  decreaseQuantity(item: Product): void {
    const index = this.itemsAndQuantity.findIndex(
      (i) => i.product.id === item.id,
    );
    if (index > -1) {
      if (this.itemsAndQuantity[index].quantity > 1) {
        this.itemsAndQuantity[index].quantity--;
        this.calculateTotal();
      }
    }
  }

  checkout() {
    this.cartService.checkout().subscribe(() => {
      this.getCartItems();
    });
  }

  toggleSelection(productId: number): void {
    if (this.selectedItems.has(productId)) {
      this.selectedItems.delete(productId);
    } else {
      this.selectedItems.add(productId);
    }
  }

  isAllSelected(): boolean {
    return (
      this.itemsAndQuantity.length > 0 &&
      this.selectedItems.size === this.itemsAndQuantity.length
    );
  }

  toggleAllSelection(): void {
    if (this.isAllSelected()) {
      this.selectedItems.clear();
    } else {
      this.itemsAndQuantity.forEach((iq) =>
        this.selectedItems.add(iq.product.id),
      );
    }
  }

  removeSelectedItems(): void {
    this.itemsAndQuantity = this.itemsAndQuantity.filter(
      (iq) => !this.selectedItems.has(iq.product.id),
    );
    this.selectedItems.clear();
    this.calculateTotal();
  }
}
