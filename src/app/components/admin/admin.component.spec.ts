
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts', 'addProduct']);

    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [FormsModule],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should load products on init', () => {
    const mockProducts = [{ id: 1, title: 'Test Product', price: 99.99, description: 'Test', category: 'Test', image: '', rating: { rate: 5, count: 10 } }];
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.products).toEqual(mockProducts);
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it('should add a product', () => {
    const mockProduct = { id: 1, title: 'New Product', price: 100, description: 'Description', category: 'Category', image: '', rating: { rate: 5, count: 10 } };
    mockProductService.addProduct.and.returnValue(of(mockProduct));

    component.newProduct = mockProduct;
    component.addProduct();

    expect(component.products).toContain(mockProduct);
    expect(mockProductService.addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should handle error', () => {
    const errorMessage = 'Error adding product';
    mockProductService.addProduct.and.returnValue(throwError(() => new Error(errorMessage)));

    component.addProduct();

    expect(component.error).toEqual(errorMessage);
  });
});
