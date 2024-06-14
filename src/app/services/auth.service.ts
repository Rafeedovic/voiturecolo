import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    // Initialisez currentUser en écoutant les changements de l'état d'authentification
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  private async waitForEmailVerification(user: firebase.User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const intervalId = setInterval(async () => {
        await user.reload(); // Recharger l'utilisateur pour obtenir les dernières informations
        if (user.emailVerified) {
          clearInterval(intervalId); // Arrêter l'intervalle
          resolve(); // L'e-mail a été vérifié avec succès
        }
      }, 1000); // Vérifier toutes les secondes
    });
  }

  async sendAndWaitForVerificationEmail(): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
        await this.waitForEmailVerification(user);
      }
    } catch (error) {
      throw new Error('Une erreur s\'est produite lors de l\'envoi de l\'email de vérification.');
    }
  }
  
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendAndWaitForVerificationEmail(); // Envoi de l'e-mail de vérification
      return result;
    } catch (error) {
      console.error("Inscription échouée", error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.currentUser = result.user; // Stocke l'utilisateur connecté
      return result.user;
    } catch (error: any) {
      console.error("Erreur de connexion", error);
      throw error.code;
    }
  }
  
  async logout() {
    await this.afAuth.signOut();
    this.currentUser = null; // Réinitialiser l'utilisateur après déconnexion
  }

  getUser() {
    return this.currentUser ? this.currentUser : null;
  }
}
