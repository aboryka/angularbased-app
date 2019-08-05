import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { MoviesService } from "./services/movies.service";
import { Component } from "@angular/core";
import { User } from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MoviesService]
})
export class AppComponent {
  movies: Array<any> = [];
  user: User;
  constructor(
    private moviesService: MoviesService,
    public authService: AuthService,
    private router: Router,
    private angularFire: AngularFireAuth
  ) {
    angularFire.authState.subscribe(user => {
      this.user = user;

      if (user) {
        this.moviesService
          .getMoviesToWatchObs()
          .subscribe((movies: Array<any>) => {
            this.movies = movies;
          });
      }

    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/repertuar"]);
  }
}
