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
  voitures_backup: any[] = [];
  voitures: any[] = [];
  selectedMarque: string = '';
  marques: string[] = [];
  carburants: string[] = [];
  selectedCarburant: string = '';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['marque', 'modele_dossier', 'designation_commerciale', 'carburant', 'puissance_maximale', 'boite_de_vitesse', 'consommation_mixte_l_100km', 'co2_g_km', 'annee', 'carrosserie', 'gamme'];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private voitureService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.getVoitures();
    this.fetchMarques(); // Appel de la méthode pour récupérer les marques disponibles
    this.fetchVoitures(); // Appel de la méthode pour récupérer les voitures
  }

  fetchVoitures(): void {
    this.voitureService.getVoitures().subscribe((data) => {
      this.voitures = data; // Assign data.results to this.voitures
      this.voitures_backup = this.voitures;
    });
  }

  fetchMarques(): void {
    this.voitureService.getMarques().subscribe((data: string[]) => {
      this.marques = data; // Mettre à jour le tableau de marques avec les données récupérées de l'API
      console.log(this.marques);
    });
  }

  fetchCarburant(): void {
    this.voitureService.getCarburant().subscribe((data: string[]) => {
      this.carburants = data; // Mettre à jour le tableau de marques avec les données récupérées de l'API
      console.log(this.carburants);
    });
  }

  applyFilter(): void {
    // Créer une copie des voitures pour éviter de modifier directement this.voitures
    let filteredVoitures = [...this.voitures];
  
    // Appliquer le filtre par marque si une marque est sélectionnée
    if (this.selectedMarque) {
      filteredVoitures = this.voitures_backup.filter(voiture => voiture.marque === this.selectedMarque);
    }

    if (this.selectedCarburant) {
      filteredVoitures = this.voitures_backup.filter(voiture => voiture.carburant === this.selectedCarburant);
    }
  
    // Mettre à jour this.voitures avec les voitures filtrées
    this.voitures = filteredVoitures;
  }
  

  // filterByMarque() {
  //   if (this.selectedMarque) {
  //     this.dataSource.data = this.voitures.filter(voiture => voiture.marque === this.selectedMarque);
  //   } else {
  //     this.dataSource.data = this.voitures;
  //   }
  // }
}
