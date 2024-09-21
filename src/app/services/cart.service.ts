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
    // Check if the product already exists in the cart
    const existingProduct = this.cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Optionally handle increasing the quantity of the product
      // For example, we can add a quantity property to Product model and increase it here
      console.log('Product already in cart. Updating quantity.');
      // existingProduct.quantity += 1; (if you have a quantity field)
    } else {
      // Add new product to the cart
      this.cart.push(product);
    }

    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(this.cart));

    // Provide some feedback
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
