// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  async logout() {
    await this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }
}
