import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to track the logged-in state
  private loggedIn = new BehaviorSubject<boolean>(false);

  // Public observable that components can subscribe to
  isLoggedIn = this.loggedIn.asObservable();

  // Method to log the user in and emit the new state
  login(): void {
    this.loggedIn.next(true);
  }

  // Method to log the user out and emit the new state
  logout(): void {
    this.loggedIn.next(false);
  }

}
