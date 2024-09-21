// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.module'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'https://fakestoreapi.com/products';
  private products = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL)
      .pipe(
        tap(data => this.products.next(data)),
        catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/${product.id}`, product);
  }
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${productId}`);
  }
  // Additional methods: addProduct, deleteProduct, etc.

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
