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
      this.router.navigate(['home']); // 
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      this.errorMessage = error;
    }
  }
}
