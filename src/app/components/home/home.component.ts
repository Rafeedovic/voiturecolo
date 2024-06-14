import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoitureService } from '../../services/voiture.service';
import { MatTableDataSource } from '@angular/material/table';


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
  selectedMarque: string = '';
  marques: string[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['marque', 'modele_dossier', 'designation_commerciale', 'carburant','puissance_maximale','boite_de_vitesse','consommation_mixte_l_100km','co2_g_km','annee','carrosserie','gamme'];

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

  filterByMarque(): void {
    if (this.selectedMarque) {
      this.voitures = this.voitures.filter(voiture => voiture.marque === this.selectedMarque);
    } else {
      this.voitures = this.voitures;
    }
  }
}