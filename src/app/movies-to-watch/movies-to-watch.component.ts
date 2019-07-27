import { AngularFireAuth } from "@angular/fire/auth";
import { Component } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { User } from "firebase";

@Component({
  selector: "app-movies-to-watch",
  templateUrl: "./movies-to-watch.component.html",
  styleUrls: ["./movies-to-watch.component.css"]
})
export class MoviesToWatchComponent {
  user: User;
  moviesToWatch = [];
  constructor(
    private moviesService: MoviesService,
    private angularFire: AngularFireAuth
  ) {
    angularFire.authState.subscribe(user => {
      this.user = user;

      if (user) {
        this.moviesService
          .getMoviesToWatchObs()
          .subscribe((movies: Array<any>) => {
            this.moviesToWatch = movies;
          });
      }
    });
  }

  removeFromWatchList(movie: string): void {
    this.moviesService.removeFromWatchList(movie);
  }
}
