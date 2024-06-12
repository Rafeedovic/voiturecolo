// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FaqComponent } from './components/faq/faq.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
    HomeComponent,
    AccueilComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatExpansionModule,
    HttpClientModule,
    MatTableModule,
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }

