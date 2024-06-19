// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { HomeComponent } from './components/home/home.component';
import { ListevoituresComponent } from './components/listevoitures/listevoitures.component';
import { FaqComponent } from './components/faq/faq.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MenuComponent } from './components/menu/menu.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { FavorisComponent } from './components/favoris/favoris.component';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },
  //{ path: '', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: '', component: AccueilComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'favoris', component: FavorisComponent },
  //{ path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
