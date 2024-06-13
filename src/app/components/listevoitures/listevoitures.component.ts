import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoitureService } from '../../services/voiture.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listevoitures',
  templateUrl: './listevoitures.component.html',
  styleUrl: './listevoitures.component.css'
})

export class ListevoituresComponent {
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
    };
    this.getVoitures();
  }

  async logout(){
    const deconnexion = await this.authService.logout();
    console.log('deconnexion');
    this.router.navigate(['home']);
    this.email = '';
  }

  getVoitures() {
    if (true) {
      this.voitureService.getVoitures().subscribe(
        data => {
          this.voitures = data.results;
        },
        error => {
          console.error('Erreur lors de la recherche de voitures:', error);
        }
      );
    }
  }
}