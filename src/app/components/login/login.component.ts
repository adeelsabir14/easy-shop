
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  error: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls as { [key: string]: any };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, role } = this.loginForm.value;


    if (username === 'admin' && password === 'admin' && role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (username === 'user' && password === 'user' && role === 'user') {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
