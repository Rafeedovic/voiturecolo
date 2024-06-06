// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: '', redirectTo: '/inscription', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
