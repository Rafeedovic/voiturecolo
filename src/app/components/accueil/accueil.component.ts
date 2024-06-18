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

  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });
  lastVoiture: any;
  showLastVoiture: boolean = false;
  sameGammeVoitures: any[] = [];

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
    this.lastVoiture = lastValue;
    console.log(this.lastVoiture);  
  }

  displayLastVoiture(): void {
    this.showLastVoiture = true;
    if (this.lastVoiture) {
      this.fetchVoituresByGamme(this.lastVoiture.gamme);
    }
  }

  fetchVoituresByGamme(gamme: string): void {
    this.voitureService.getVoitures()
      .subscribe((data) => {
        this.sameGammeVoitures = data.filter(voiture => voiture.gamme === gamme);
      }, (error) => {
        console.error('Error fetching voitures', error);
      });
  }
}