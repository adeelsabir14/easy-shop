import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service'; // Mocked AuthService
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    // Mocking AuthService
    const authServiceMock = {
      isLoggedIn: jest.fn()
    };

    // Initializing test environment
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])], // No routes needed for testing
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    // Inject dependencies
    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the route if the user is logged in', () => {
    // Mock the isLoggedIn method to return true
    authService.isLoggedIn.mockReturnValue(of(true));

    authGuard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(true);
    });
  });

  it('should redirect to the login page if the user is not logged in', () => {
    // Spy on the router's navigate method
    const navigateSpy = jest.spyOn(router, 'navigate');

    // Mock the isLoggedIn method to return false
    authService.isLoggedIn.mockReturnValue(of(false));

    authGuard.canActivate().subscribe((canActivate) => {
      expect(canActivate).toBe(false);
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});
