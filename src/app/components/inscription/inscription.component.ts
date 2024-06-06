import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  userInfo: { nom: string, prenom: string, email: string } | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, nom, prenom } = this.registerForm.value;
      try {
        const result = await this.authService.register(email, password);
        // Stocker les informations de l'utilisateur
        this.userInfo = {
          email: email,
          nom: nom,
          prenom: prenom
        };
        this.errorMessage = '';
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "An unknown error occurred";
        }
      }
    }
  }
}
