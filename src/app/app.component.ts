import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'voiturecolo';
  user = this.authService.getUser();
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "An unknown error occurred";
        }
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
