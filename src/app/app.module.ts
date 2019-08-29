import { CinemaHallModule } from './cinema-hall/cinema-hall.module';
import { CurrentMoviesModule } from './current-movies/current-movies.module';
import { MoviesListModule } from './movies-list/movies-list.module';
import { MoviesToWatchListModule } from './movies-to-watch-list/movies-to-watch-list.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { MovieService } from './services/movie.service';
import { MoviesService } from './services/movies.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
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
    AppComponent
  ],
  imports: [
    CurrentMoviesModule,
    MoviesToWatchListModule,
    MoviesListModule,
    CinemaHallModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AuthModule,
    MoviesModule
  ],
  providers: [MoviesService, MovieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
