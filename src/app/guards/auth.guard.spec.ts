import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const routerSpy = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isLoggedIn: () => of(false) } },  // Default mock for auth service
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if user is logged in', (done: DoneFn) => {
    // Simulate the user being logged in
    spyOn(authService, 'isLoggedIn').and.returnValue(of(true));

    authGuard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeTrue();
      done();
    });
  });

  it('should deny access and navigate to login if user is not logged in', (done: DoneFn) => {
    // Simulate the user not being logged in
    spyOn(authService, 'isLoggedIn').and.returnValue(of(false));

    authGuard.canActivate().subscribe(isAllowed => {
      expect(isAllowed).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
