import { MoviesComponent, MovieComponent } from "./index";
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
        component: MovieComponent
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

