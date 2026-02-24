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
  filteredProducts: Product[] = [];
  sortOrder = 'asc';

  getAllProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.map((product) => ({
        ...product,

        image_url: 'assets/images/' + product.image_url,
      }));
      this.filteredProducts = this.products;
    });
  }

  addToCart() {
    this.snackBar.open('Product added to cart', 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  applyFilter(event: Event) {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm),
    );
  }

  sortProducts(value: string) {
    this.sortOrder = value;

    if (this.sortOrder === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
