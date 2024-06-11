import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Correct import

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'], // Fix typo: should be styleUrls
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Property to store the error message

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const result = await this.authService.login(this.email, this.password);
      console.log('Connexion réussie:', result);
      
      // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
      this.router.navigate(['/home']); // remplacez '/home' par la route de votre choix
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      this.errorMessage = error;
      // Vérifiez si error.code est défini
      // if (error.code) {
      //   // Gestion des erreurs Firebase spécifiques
      //   switch (error.code) {
      //     case 'auth/invalid-email':
      //       this.errorMessage = 'L\'adresse e-mail est invalide.';
      //       break;
      //     case 'auth/user-disabled':
      //       this.errorMessage = 'L\'utilisateur correspondant à cette adresse e-mail a été désactivé.';
      //       break;
      //     case 'auth/user-not-found':
      //       this.errorMessage = 'Aucun utilisateur correspondant à cette adresse e-mail.';
      //       break;
      //     case 'auth/wrong-password':
      //       this.errorMessage = 'Le mot de passe est incorrect.';
      //       break;
      //     case 'auth/invalid-credential':
      //       this.errorMessage = 'Les informations d\'identification fournies sont incorrectes ou ont expiré.';
      //       break;
      //     default:
      //       this.errorMessage = 'Une erreur inconnue s\'est produite.';
      //       break;
      //   }
      // } else {
      //   // Afficher un message d'erreur générique si error.code n'est pas défini
      //   this.errorMessage = 'Une erreur inconnue s\'est produite.';
      // }
    }
  }
}
