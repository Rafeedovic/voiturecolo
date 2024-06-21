import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      const { nom, prenom ,email, password} = this.registerForm.value;
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
        this.successMessage = 'Votre inscription est bien validée, redirection ... '; // Afficher le message de succès
        setTimeout(() => {
          this.router.navigate(['/connexion']);
        }, 5000);
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
