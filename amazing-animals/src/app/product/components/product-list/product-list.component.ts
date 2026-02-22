import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

  getAllProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.map((product) => ({
        ...product,

        image_url: 'assets/images/' + product.image_url,
      }));
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
