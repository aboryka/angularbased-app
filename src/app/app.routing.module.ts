import { MoviesComponent } from './movies/movies.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesRoutingModule } from './movies/movies.routing.module';


const appRoutes: Routes = [
  {
    path: "repertuar",
    component: MoviesComponent
  },
  {
    path: "logowanie",
    component: AuthComponent
  },
  {
    path: "",
    redirectTo: "/repertuar",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [MoviesRoutingModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
