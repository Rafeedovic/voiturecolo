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
  selectedMarque: string = 'Toutes les marques';
  selectedCarburant: string = 'Tous les carburants';
  selectedAnnee: string = 'Toutes les années';
  selectedCarrosserie: string = 'Toutes les carrosseries';
  selectedGamme: string = 'Toutes les gammes';

  marques: string[] = [];
  carburants: string[] = [];
  annees: string[] = [];
  carrosseries: string[] = [];
  gammes: string[] = [];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['marque', 'modele_dossier', 'designation_commerciale', 'carburant', 'puissance_maximale', 'boite_de_vitesse', 'consommation_mixte_l_100km', 'co2_g_km', 'annee', 'carrosserie', 'gamme'];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private voitureService: VoitureService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchVoitures();
    this.fetchMarques();
    this.updateOptions();
  }

  fetchVoitures(): void {
    this.voitureService.getVoitures().subscribe((data) => {
      this.voitures = data;
      this.voitures_backup = [...data];
      this.updateOptions();
    });
  }

  fetchMarques(): void {
    this.voitureService.getMarques().subscribe((data: string[]) => {
      this.marques = ['Toutes les marques', ...data];
    });
  }

  updateOptions(): void {
    const filteredVoitures = this.selectedMarque === 'Toutes les marques' ? this.voitures_backup : this.voitures_backup.filter(voiture => voiture.marque === this.selectedMarque);

    const carburantsSet = new Set<string>(filteredVoitures.map(voiture => voiture.carburant));
    this.carburants = ['Tous les carburants', ...Array.from(carburantsSet)];

    const anneesSet = new Set<string>(filteredVoitures.map(voiture => voiture.annee));
    this.annees = ['Toutes les années', ...Array.from(anneesSet)];

    const carrosseriesSet = new Set<string>(filteredVoitures.map(voiture => voiture.carrosserie));
    this.carrosseries = ['Toutes les carrosseries', ...Array.from(carrosseriesSet)];

    const gammesSet = new Set<string>(filteredVoitures.map(voiture => voiture.gamme));
    this.gammes = ['Toutes les gammes', ...Array.from(gammesSet)];
  }

  applyFilter(): void {
    let filteredVoitures = this.voitures_backup;

    if (this.selectedMarque !== 'Toutes les marques') {
      filteredVoitures = filteredVoitures.filter(voiture => voiture.marque === this.selectedMarque);
    }

    if (this.selectedCarburant !== 'Tous les carburants') {
      filteredVoitures = filteredVoitures.filter(voiture => voiture.carburant === this.selectedCarburant);
    }

    if (this.selectedAnnee !== 'Toutes les années') {
      filteredVoitures = filteredVoitures.filter(voiture => voiture.annee === this.selectedAnnee);
    }

    if (this.selectedCarrosserie !== 'Toutes les carrosseries') {
      filteredVoitures = filteredVoitures.filter(voiture => voiture.carrosserie === this.selectedCarrosserie);
    }

    if (this.selectedGamme !== 'Toutes les gammes') {
      filteredVoitures = filteredVoitures.filter(voiture => voiture.gamme === this.selectedGamme);
    }

    this.voitures = filteredVoitures;
    this.updateOptions();
  }
}
