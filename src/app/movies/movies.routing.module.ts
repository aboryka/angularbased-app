import { CinemaHallComponent } from './movies-to-book/cinema-hall/cinema-hall.component';
import { MoviesComponent, MovieDetailComponent } from "./index";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const moviesRoutes: Routes = [
  {
    path: "",
    redirectTo: "/repertuar",
    pathMatch: "full"
  },
  {
    path: "repertuar",
    children: [
      {
        path: "",
        component: MoviesComponent
      },
      {
        path: ":id",
        component: MovieDetailComponent
      }
    ]
  },
  {
    path: "sala-kinowa",
    component: CinemaHallComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(moviesRoutes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {

}

