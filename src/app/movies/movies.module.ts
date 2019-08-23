import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MoviesComponent, CurrentMoviesComponent, MoviesListComponent, MovieDetailComponent, CinemaHallComponent, MoviesToBookComponent } from "./index";


@NgModule({
  declarations: [
    MoviesComponent,
    CurrentMoviesComponent,
    MoviesListComponent,
    MovieDetailComponent,
    CinemaHallComponent,
    MoviesToBookComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoviesToBookComponent
  ]
})
export class MoviesModule {

}
