import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})

export class AccueilComponent {
  email : any  | null = '';
  
  constructor(private route: ActivatedRoute,private authService: AuthService,private router: Router) {}

  ngOnInit() {
    if (this.authService.getUser()){
      this.email = this.authService.getUser()?.email;
    }
  }

  async logout(){
    const deconnexion = await this.authService.logout();
    console.log('deconnexion');
    this.router.navigate(['accueil']);
    this.email = '';
  }
}