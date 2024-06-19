import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  email: string = ''; // Propriété pour stocker l'email de l'utilisateur connecté
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.email = this.authService.getUserEmail(); // Initialisation de l'email à partir du service d'authentification
  }
  onLogout() {
    this.authService.logout();
  }
}
