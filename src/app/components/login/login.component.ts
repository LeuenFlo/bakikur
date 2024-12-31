import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h1>Admin Login</h1>
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Benutzername</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="credentials.username" 
              required 
              #username="ngModel">
            <div class="error" *ngIf="username.invalid && username.touched">
              Benutzername ist erforderlich
            </div>
          </div>

          <div class="form-group">
            <label for="password">Passwort</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="credentials.password" 
              required 
              #password="ngModel">
            <div class="error" *ngIf="password.invalid && password.touched">
              Passwort ist erforderlich
            </div>
          </div>

          <div class="error" *ngIf="loginError">
            {{ loginError }}
          </div>

          <button type="submit" [disabled]="!loginForm.form.valid || isLoading">
            {{ isLoading ? 'Anmeldung...' : 'Anmelden' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .login-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input.ng-invalid.ng-touched {
      border-color: #dc3545;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background: #0056b3;
    }
  `]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  isLoading = false;
  loginError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.loginError = null;

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.loginError = 'Ungültige Anmeldedaten';
          this.isLoading = false;
        }
      });
  }
} 