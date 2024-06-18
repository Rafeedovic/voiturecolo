import { Component } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VoitureService } from '../../services/voiture.service';
import { OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})

export class AccueilComponent {
  email : any  | null = '';
  showResult: boolean = false; // Variable pour contrôler l'affichage du résultat


  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  lastVoiture: any;
  showLastVoiture: boolean = false;
  sameGammeVoitures: any[] = [];
  choixFiltrage: string = 'annee';

  ngOnInit(): void {
    if (this.authService.getUser()){
      this.email = this.authService.getUser()?.email;
    }

    this.slides[0] = {
      id: 0,
      src: './../../../assets/wp2787426.jpg',
      title: 'Bienvenue à VoiturEcolo !',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './../../../assets/pngtree-d-rendering-of-energy-station-charging-an-electric-vehicle-ev-image_3704043.jpg',
      title: 'Bienvenue à VoiturEcolo !',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    };
    this.slides[2] = {
      id: 2,
      src: './../../../assets/electric-car-4k-bmw-i-vision-dynamics-wallpaper-preview.jpg',
      title: 'Bienvenue à VoiturEcolo !',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    };
  }
  
  constructor(private route: ActivatedRoute,private authService: AuthService,private router: Router,private voitureService: VoitureService) {}

  async logout(){
    const deconnexion = await this.authService.logout();
    console.log('deconnexion');
    this.router.navigate(['accueil']);
    this.email = '';
  }

  handleLastValue(lastValue: any): void {
    this.showResult= false;
    this.lastVoiture = lastValue;
    console.log(this.lastVoiture);  
  }

  displayLastVoiture(): void {
    this.showLastVoiture = true;
    if (this.showResult!=true){
      this.showResult = true;
    }
    else{
      this.showResult = false;
    }
    // if (this.lastVoiture) {
    //   this.fetchVoituresByGamme(this.lastVoiture.gamme);
    // }
  }

  fetchVoituresByGamme(gamme: string): void {
    this.voitureService.getVoitures()
      .subscribe((data) => {
        this.sameGammeVoitures = data.filter(voiture => voiture.gamme === gamme);
      }, (error) => {
        console.error('Error fetching voitures', error);
      });
  }

  fetchVoituresByAnnee(gamme: string,annee: string): void {
    this.voitureService.getVoitures()
      .subscribe((data) => {
        this.sameGammeVoitures = data.filter(voiture => (voiture.annee === annee) && (voiture.gamme === gamme));
        this.sameGammeVoitures.sort((a, b) => a.co2_g_km - b.co2_g_km);
      }, (error) => {
        console.error('Error fetching voitures', error);
      });
  }

  fetchVoituresByPuissanceFiscale(gamme: string,puissance_administrative: string): void {
    this.voitureService.getVoitures()
      .subscribe((data) => {
        this.sameGammeVoitures = data.filter(voiture => (voiture.puissance_administrative === puissance_administrative) && (voiture.gamme === gamme));
        this.sameGammeVoitures.sort((a, b) => a.co2_g_km - b.co2_g_km);
      }, (error) => {
        console.error('Error fetching voitures', error);
      });
  }

  fetchVoituresByPuissanceDin(gamme: string,puissance_maximale: string): void {
    this.voitureService.getVoitures()
      .subscribe((data) => {
        this.sameGammeVoitures = data.filter(voiture => (voiture.puissance_maximale === puissance_maximale) && (voiture.gamme === gamme));
        this.sameGammeVoitures.sort((a, b) => a.co2_g_km - b.co2_g_km);
      }, (error) => {
        console.error('Error fetching voitures', error);
      });
  }
  filterVoitures(): void {
    
    this.fetchVoituresByGamme(this.lastVoiture.gamme)
    //this.displayLastVoiture();
    console.log(this.choixFiltrage);
    switch (this.choixFiltrage) {
      case 'annee':
        this.fetchVoituresByAnnee(this.lastVoiture.gamme,this.lastVoiture.annee);
        break;
      case 'puissance_administrative':
        this.fetchVoituresByPuissanceFiscale(this.lastVoiture.gamme,this.lastVoiture.puissance_administrative);
        break;
      case 'puissance_maximale':
        this.fetchVoituresByPuissanceDin(this.lastVoiture.gamme,this.lastVoiture.puissance_maximale);
        break;
      // default:
      //   this.filteredVoitures = [];
      //   break;
    }
  }
  trierParCO2(): void {
    this.sameGammeVoitures.sort((a, b) => a.co2_g_km - b.co2_g_km);
  }
}