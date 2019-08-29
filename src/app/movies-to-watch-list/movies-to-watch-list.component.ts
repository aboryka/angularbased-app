import { Subscription } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { User } from "firebase";

@Component({
  selector: "app-movies-to-watch-list",
  templateUrl: "./movies-to-watch-list.component.html",
  styleUrls: ["./movies-to-watch-list.component.scss"]
})
export class MoviesToWatchListComponent implements OnInit, OnDestroy {
  user: User;
  moviesToWatch = [];
  subscription: Subscription;
  constructor(private moviesService: MoviesService, private angularFire: AngularFireAuth) {
    this.subscription = angularFire.authState.subscribe(user => {
      this.user = user;

      if (this.user) {
        this.moviesService
          .getMoviesToWatchObs()
          .subscribe((movies: Array<any>) => {
            this.moviesToWatch = movies;
          });
      }
    })
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeFromWatchList(movie: string): void {
    this.moviesService.removeFromWatchList(movie);
  }
}
