import { AuthComponent } from './auth/auth.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";
import { MovieComponent } from "./movie/movie.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "movies",
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
  },
  {
    path: "login",
    component: AuthComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
