import { Component } from '@angular/core';
import { VoitureService } from '../../services/voiture.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent {
  favoris: any[] = [];

  constructor(private voitureService: VoitureService) {}

  ngOnInit(): void {
    this.getFavoris();
  }

  supprimerDesFavoris(voiture: any): void {
    this.voitureService.supprimerDesFavoris(voiture);
    this.getFavoris(); // Mettre à jour la liste des favoris après suppression
  }

  getFavoris(): void {
    this.favoris = this.voitureService.getFavoris();
  }
}
