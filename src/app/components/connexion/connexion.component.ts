import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Property to store the error message
  connexion: string = ''; // Fix typo and remove unnecessary semicolon

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const result = await this.authService.login(this.email, this.password);
      this.connexion = "Connexion réussie => redirection ...";
      console.log('Connexion réussie:', result);
      
      // Delay the redirection to show the success message
      setTimeout(() => {
        // Redirect to the home page or another page after successful login
        this.router.navigate(['']); // Replace '' with '/acceuil'
      }, 2000); // Adjust the delay as needed

    } catch (error: any) {
      this.connexion = "Erreur lors de la connexion";
      console.error('Erreur lors de la connexion:', error);
      this.errorMessage = error.message || error;
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/accueil']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
