import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.module';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addProduct() {
    throw new Error('Method not implemented.');
  }
  products: Product[] = [];
  selectedProduct: Product | null = null;
  newProduct: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: { rate: 0, count: 0 }
  };
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => this.products = products,
      (err) => this.error = err.message
    );
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe(
        () => {
          this.loadProducts();
          this.selectedProduct = null;
        },
        (err) => this.error = err.message
      );
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => this.loadProducts(),
      (err) => this.error = err.message
    );
  }
}
