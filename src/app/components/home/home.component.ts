import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.module';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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
  
    handleAddToCart(product: Product): void {
      this.cartService.addToCart(product);
      console.log('Product added to cart:', product);
    }
  
    addToCart(product: Product): void {
      this.cartService.addToCart(product);
      console.log('Added to cart:', product);
    }


}
