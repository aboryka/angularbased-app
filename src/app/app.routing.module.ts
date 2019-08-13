import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesRoutingModule } from './movies/movies.routing.module';
import { AuthRoutingModule } from './auth/auth.routing.module';


const appRoutes: Routes = [
];

@NgModule({
  imports: [AuthRoutingModule, MoviesRoutingModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
