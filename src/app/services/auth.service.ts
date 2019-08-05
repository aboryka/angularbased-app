import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loginErr: string;
  registerErr: string;
  subsAuth: Subscription;
  authState: any;

  constructor(private angularFire: AngularFireAuth, private router: Router) {
    this.subsAuth = angularFire.authState.subscribe(user => {
      this.user = user;
    })
   }

  login(email: string, password: string): void {
    this.loginErr = '';

    this.angularFire.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/repertuar']);
    }).catch(err => {
      if (err.code === "auth/invalid-email" || err.code === "auth/wrong-password") {
        this.loginErr = 'Email lub hasło są nieprawidłowe.';
      } else {
        this.loginErr = "Wystąpił nieoczekiwany błąd, spróbuj zalogować się później."
      }
    });
  }

  signup(email: string, password: string): void {
    this.registerErr = '';

    this.angularFire.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.router.navigate(['/repertuar']);
    }).catch(err => {
      if (err.code === "auth/email-already-in-use") {
        this.registerErr = "Użytkownik o podanym adresie email istnieje.";
      }
    });
  }

  logout(): void {
    this.angularFire.auth.signOut();
  }
}
