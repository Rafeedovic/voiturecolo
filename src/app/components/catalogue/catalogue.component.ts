import { Component, OnInit } from '@angular/core';
import { VoitureService } from '../../services/voiture.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  marquesAvecNombreVoitures: { marque: string; nombreVoitures: number }[] = [];
  couleursNaturelles = [
    '#FF5722', // Orange vif
  ];
  
  constructor(private voitureService: VoitureService) {}

  ngOnInit(): void {
    this.loadMarquesAvecNombreVoitures();
  }

  loadMarquesAvecNombreVoitures() {
    this.voitureService.getNombreVoituresParMarque().subscribe(
      (data: { marque: string; nombreVoitures: number }[]) => {
        this.marquesAvecNombreVoitures = data;
        //console.log(this.marquesAvecNombreVoitures);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des marques avec nombre de voitures : ', error);
      }
    );
  }

}
