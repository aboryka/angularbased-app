import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { MoviesService } from "./services/movies.service";
import { Component } from "@angular/core";
import { User } from "firebase";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MoviesService]
})
export class AppComponent{
  movies: Array<any> = [];
  user: User;
  subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/repertuar"]);
  }

}
