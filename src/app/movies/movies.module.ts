import { MoviesListModule } from './../movies-list/movies-list.module';
import { CurrentMoviesModule } from './../current-movies/current-movies.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MoviesComponent, MovieComponent } from "./index";


@NgModule({
  declarations: [
    MoviesComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    CurrentMoviesModule,
    MoviesListModule
  ],
  exports: [
  ]
})
export class MoviesModule {

}
