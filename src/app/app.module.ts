import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { MovieService } from './services/movie.service';
import { MoviesService } from './services/movies.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CurrentMoviesComponent } from './current-movies/current-movies.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesToWatchComponent } from './movies-to-watch/movies-to-watch.component';
import { MovieComponent } from './movie/movie.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "AIzaSyAbW-qeDdJD7e_9eZW7WxCvrzYrSgaqKdE",
  authDomain: "uzytkownicy-cinema-stuff.firebaseapp.com",
  databaseURL: "https://uzytkownicy-cinema-stuff.firebaseio.com",
  projectId: "uzytkownicy-cinema-stuff",
  storageBucket: "",
  messagingSenderId: "357149638598",
  appId: "1:357149638598:web:5e728df1bf68f904"
};


@NgModule({
  declarations: [
    AppComponent,
    CurrentMoviesComponent,
    MovieComponent,
    MoviesComponent,
    MoviesToWatchComponent,
    HomeComponent,
    AuthComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule, AngularFireAuthModule
  ],
  providers: [MoviesService, MovieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
