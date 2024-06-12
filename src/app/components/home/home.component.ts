import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoitureService } from '../../services/voiture.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  email : any  | null = '';
  searchQuery: string = '';
  voitures: any[] = [];
  firstVoiture: any;
  constructor(private route: ActivatedRoute,private authService: AuthService,private voitureService: VoitureService,private router: Router) {}

  ngOnInit() {
    if (this.authService.getUser()){
      this.email = this.authService.getUser()?.email;
    }
  }

  async logout(){
    const deconnexion = await this.authService.logout();
    console.log('deconnexion');
    this.router.navigate(['home']);
    this.email = '';
  }

  searchVoitures() {
    if (this.searchQuery.trim()) {
      this.voitureService.searchVoitures(this.searchQuery).subscribe(
        data => {
          console.log(data.results);
          //this.voitures = data.records.results.map((record: any) => record.fields);
          this.voitures = data.results;
          this.firstVoiture = this.voitures[0]; // Récupérer la première voiture
          console.log(this.firstVoiture);
        },
        error => {
          console.error('Erreur lors de la recherche de voitures:', error);
        }
      );
    }
  }
}