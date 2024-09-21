import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should load products on init', () => {
    const mockProducts = [{ id: 1, title: 'Test Product', price: 99.99, description: 'Test', category: 'Test', image: '', rating: { rate: 5, count: 10 } }];
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.products).toEqual(mockProducts);
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it('should handle error', () => {
    const errorMessage = 'Error loading products';
    mockProductService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));

    component.ngOnInit();

    expect(component.error).toEqual(errorMessage);
  });
});
