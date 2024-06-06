import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})



export class InscriptionComponent {
  submitted: boolean = false;
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
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
    this.submitted = true;
    if (this.registerForm.valid) {
      const { email, password, nom, prenom } = this.registerForm.value;
      try {
        // Inscription de l'utilisateur
        await this.authService.register(email, password);
        // Stocker les informations de l'utilisateur
        this.userInfo = {
          email: email,
          nom: nom,
          prenom: prenom
        };
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.successMessage = 'Votre inscription est bien validée '; // Afficher le message de succès
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = "Une erreur inconnue s'est produite.";
        }
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    }
  }
}
