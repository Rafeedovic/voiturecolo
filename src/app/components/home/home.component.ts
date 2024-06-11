import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  email : any  | null = '';
  
  constructor(private route: ActivatedRoute,private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.getUser()){
      this.email = this.authService.getUser()?.email;
    }
  }

  async logout(){
    const deconnexion = await this.authService.logout();
  }
}