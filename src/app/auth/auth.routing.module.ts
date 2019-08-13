import { AuthComponent } from './index';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const authRoutes: Routes = [
  {
    path: "logowanie",
    component: AuthComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
