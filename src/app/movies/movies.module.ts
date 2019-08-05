import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MoviesComponent, CurrentMoviesComponent, MoviesListComponent, MovieDetailComponent } from "./index";

@NgModule({
  declarations: [
    MoviesComponent,
    CurrentMoviesComponent,
    MoviesListComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MoviesModule {

}
