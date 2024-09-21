// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.module';
import { CartService } from '../../services/cart.service'; // Ensure CartService is imported

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  error = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      err => this.error = err
    );
  }

  handleAddToCart(product: Product): void { // Correct parameter naming and syntax
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
  }
}
