import { MoviesService } from './services/movies.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CurrentMoviesComponent } from './current-movies/current-movies.component';
import { MoviesComponent } from './movies/movies.component';
import { MoviesToWatchComponent } from './movies-to-watch/movies-to-watch.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentMoviesComponent,
    MoviesComponent,
    MoviesToWatchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
