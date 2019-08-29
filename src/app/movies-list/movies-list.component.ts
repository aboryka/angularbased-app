import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { MoviesService } from "../services/movies.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.scss"]
})
export class MoviesListComponent implements OnInit, OnDestroy {

  movies: Array<any>;
  subscription: Subscription;

  constructor(private moviesService: MoviesService, private router: Router, private angularFire: AngularFireAuth, public authService: AuthService) {
    this.movies = this.moviesService.getMovies();

    this.subscription = angularFire.authState.subscribe(user => {
      this.moviesService.tooltipClicked = new Array(this.movies.length);
    });
  }

  ngOnInit() {
    this.moviesService.sortByTime();
  }

  addToWatchList(movie: string, elemIndex: number): void {
    if (!this.moviesService.tooltipClicked[elemIndex]) {
      this.moviesService.customTooltip(elemIndex);
    }
    if (this.authService.user) {
      this.moviesService.addToWatchList(movie);
    }
  }

  closeTooltip(elemIndex: number) {
    this.moviesService.customTooltip(elemIndex);
  }


  showDetails(id: string): void {
    this.router.navigate(["/repertuar", id]);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
