import { Subscription } from 'rxjs';
import { MoviesService } from "../../services/movies.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.scss"]
})
export class MoviesListComponent implements OnInit, OnDestroy {

  movies: Array<any>;
  tooltipClicked: Array<boolean>;
  user: User;
  subscription: Subscription;

  constructor(private moviesService: MoviesService, private router: Router, private angularFire: AngularFireAuth) {
    this.movies = this.moviesService.getMovies();
    this.tooltipClicked = new Array(this.movies.length);

    this.subscription = angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.moviesService.sortByTime();
  }

  addToWatchList(movie: string, elemIndex: number): void {
    if (!this.tooltipClicked[elemIndex]) {
      this.watchListTooltip(elemIndex);
    }
    if (this.user) {
      this.moviesService.addToWatchList(movie);
    }
  }

  watchListTooltip(elemIndex: number): void {
    this.tooltipClicked[elemIndex] = !this.tooltipClicked[elemIndex] ;
    const tooltip = <HTMLElement>(
      document.getElementsByClassName("c-movies__tooltip")[elemIndex]
    );

    setTimeout(() => {
      tooltip.classList.toggle("c-movies__tooltip--active");
    }, 100);
  }

  showDetails(id: string): void {
    this.router.navigate(["/movies", id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
