import { Injectable } from '@angular/core';
import { Product } from '../models/product.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  addToCart(product: Product): void {
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      console.log('Product already in cart. Updating quantity.');
    } else {
      this.cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));

    console.log('Cart updated:', this.cart);
  }

  getCart(): Product[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}
