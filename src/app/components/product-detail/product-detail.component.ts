// src/app/components/product-detail/product-detail.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.module';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(Number(productId));
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        this.error = 'Failed to load product';
      }
    );
  }

  addToCart(product: Product): void {
    try {
      console.log('Added to cart:', product);
      // Add to cart logic goes here
    } catch (e) {
      this.error = 'Failed to add product to cart';
    }
  }
}
