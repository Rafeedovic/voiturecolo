import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoitureService } from '../../services/voiture.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource : any = this.voitures;

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