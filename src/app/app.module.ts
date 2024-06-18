// src/app/app.module.ts
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
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
import { ListevoituresComponent } from './components/listevoitures/listevoitures.component';
import {MatSelectModule} from '@angular/material/select';

import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselCaptionComponent,CarouselComponent,CarouselControlComponent,CarouselIndicatorsComponent,CarouselInnerComponent,CarouselItemComponent,ThemeDirective} from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
    HomeComponent,
    AccueilComponent,
    FaqComponent,
    ListevoituresComponent,
    CatalogueComponent,
    MenuComponent
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
    MatSelectModule,
    BrowserAnimationsModule,
    CarouselModule,
    ThemeDirective, 
    CarouselComponent, 
    CarouselIndicatorsComponent, 
    CarouselInnerComponent, 
    CarouselItemComponent, 
    CarouselCaptionComponent, 
    CarouselControlComponent, 
    RouterLink,
  ],
  providers: [AuthService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

