import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

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
      return result;
    } catch (error:any) {
      // Ajout de plus de détails sur l'erreur
      console.error("Erreur de connexion", error);
  
      // Gestion des erreurs Firebase spécifiques
      // switch (error.code) {
      //   case 'auth/invalid-email':
      //     throw new Error('L\'adresse e-mail est invalide.');
      //   case 'auth/user-disabled':
      //     throw new Error('L\'utilisateur correspondant à cette adresse e-mail a été désactivé.');
      //   case 'auth/user-not-found':
      //     throw new Error('Aucun utilisateur correspondant à cette adresse e-mail.');
      //   case 'auth/wrong-password':
      //     throw new Error('Le mot de passe est incorrect.');
      //   default:
      //     throw new Error('Une erreur s\'est produite lors de la connexion.');
      // }
      throw error.code;
    }
  }
  

  async logout() {
    await this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }
}
