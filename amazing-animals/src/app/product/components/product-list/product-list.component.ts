import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
  ) {}

  products: Product[] = [];

  getAllProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.map((product) => ({
        ...product,

        image_url: 'assets/images/' + product.image_url,
      }));
    });
  }

  addToCart() {
    this.snackBar.open('Product added to cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
