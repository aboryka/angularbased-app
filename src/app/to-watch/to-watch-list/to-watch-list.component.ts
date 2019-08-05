import { Subscription } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { User } from "firebase";

@Component({
  selector: "app-to-watch-list",
  templateUrl: "./to-watch-list.component.html",
  styleUrls: ["./to-watch-list.component.scss"]
})
export class ToWatchListComponent implements OnInit, OnDestroy {
  user: User;
  moviesToWatch = [];
  subscription: Subscription;
  constructor( private moviesService: MoviesService, private angularFire: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.subscription = this.angularFire.authState.subscribe(user => {
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeFromWatchList(movie: string): void {
    this.moviesService.removeFromWatchList(movie);
  }
}
