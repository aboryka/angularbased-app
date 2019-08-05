import { MoviesComponent, MovieDetailComponent } from "./index";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const moviesRoutes: Routes = [
  {
    path: "movies",
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(moviesRoutes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {

}

