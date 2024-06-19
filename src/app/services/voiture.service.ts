import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importez map depuis 'rxjs/operators'
import { Voiture } from '../components/listevoitures/voiture';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class VoitureService {
  private limit_results :string = `100`;
  private apiUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/vehicules-commercialises/records?limit='+this.limit_results;
  private localStorageKey = 'favoris'; // Clé pour stocker les favoris dans localStorage  
  
  constructor(private http: HttpClient,private authService: AuthService) {}

  searchVoitures(query: string): Observable<any> {
    const url = `${this.apiUrl}&q=${query}`;
    return this.http.get<any>(url);
  }

  getVoitures(): Observable<Voiture[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<{ results: Voiture[] }>(url)
               .pipe(map(response => response.results)); // Extract results field
  }

  getMarques(): Observable<string[]> {
    return this.getVoitures().pipe(
      map((voitures:any[]) => {
        const marquesSet = new Set<string>(); // Utiliser un Set pour éviter les doublons

        voitures.forEach((voiture:any) => {
          marquesSet.add(voiture.marque); // Ajouter chaque marque dans le Set
        });

        return Array.from(marquesSet); // Convertir le Set en tableau
      })
    );
  }

  getNombreVoituresParMarque(): Observable<{ marque: string; nombreVoitures: number }[]> {
    return this.getVoitures().pipe(
      map((voitures: Voiture[]) => {
        const marqueCountMap = new Map<string, { marque: string; nombreVoitures: number }>();
        
        voitures.forEach(voiture => {
          const marque = voiture.marque;
          if (!marqueCountMap.has(marque)) {
            marqueCountMap.set(marque, { marque: marque, nombreVoitures: 1 });
          } else {
            const entry = marqueCountMap.get(marque);
            if (entry) {
              entry.nombreVoitures++;
            }
          }
        });
        console.log(Array.from(marqueCountMap.values()))
        return Array.from(marqueCountMap.values());
      })
    );
  }

  getCarburant(): Observable<string[]> {
    return this.getVoitures().pipe(
      map((voitures:any[]) => {
        const carburantsSet = new Set<string>(); // Utiliser un Set pour éviter les doublons

        voitures.forEach((voiture:any) => {
          carburantsSet.add(voiture.carburant); // Ajouter chaque marque dans le Set
        });

        return Array.from(carburantsSet); // Convertir le Set en tableau
      })
    );
  }

  private getKeyForUser(): string {
    const userEmail = this.authService.getUser()?.email;
    return `${this.localStorageKey}_${userEmail}`;
  }

  public getFavoris(): any[] {
    const key = this.getKeyForUser();
    const favorisString = localStorage.getItem(key);
    return favorisString ? JSON.parse(favorisString) : [];
  }

  private generateUniqueIdentifier(voiture: any): string {
    // Utilisation de la paire (marque, modèle commercial) comme identifiant unique
    return `${voiture.marque}_${voiture.designation_commerciale}`;
  }

  ajouterAuxFavoris(voiture: Voiture): void {
    const key = this.getKeyForUser();
    const favoris = this.getFavoris();
    const uniqueIdentifier = this.generateUniqueIdentifier(voiture);

    if (!favoris.find(v => this.generateUniqueIdentifier(v) === uniqueIdentifier)) {
      favoris.push(voiture);
      localStorage.setItem(key, JSON.stringify(favoris));
    }
  }

  estDansFavoris(voiture: any): boolean {
    const favoris = this.getFavoris();
    const uniqueIdentifier = this.generateUniqueIdentifier(voiture);
    return favoris.some(v => this.generateUniqueIdentifier(v) === uniqueIdentifier);
  }

  supprimerDesFavoris(voiture: any): void {
    const key = this.getKeyForUser();
    let favoris = this.getFavoris().filter(v => {
      return !(v.marque === voiture.marque && v.designation_commerciale === voiture.designation_commerciale);
    });
    localStorage.setItem(key, JSON.stringify(favoris));
  }
}