import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoitureService } from '../../services/voiture.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listevoitures',
  templateUrl: './listevoitures.component.html',
  styleUrls: ['./listevoitures.component.css']
})
export class ListevoituresComponent implements OnInit {
  searchQuery: string = '';
  voitures: any[] = [];
  selectedMarque: string = '';
  marques: string[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['marque', 'modele_dossier', 'designation_commerciale', 'carburant', 'puissance_maximale', 'boite_de_vitesse', 'consommation_mixte_l_100km', 'co2_g_km', 'annee', 'carrosserie', 'gamme'];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private voitureService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getVoitures();
  }

  getVoitures() {
    this.voitureService.getVoitures().subscribe(
      data => {
        this.voitures = data.results;
        // this.marques = [...new Set(this.voitures.map(voiture => voiture.marque))];
        // this.filterByMarque();
      },
      error => {
        console.error('Erreur lors de la recherche de voitures:', error);
      }
    );
  }

  // filterByMarque() {
  //   if (this.selectedMarque) {
  //     this.dataSource.data = this.voitures.filter(voiture => voiture.marque === this.selectedMarque);
  //   } else {
  //     this.dataSource.data = this.voitures;
  //   }
  // }
}
