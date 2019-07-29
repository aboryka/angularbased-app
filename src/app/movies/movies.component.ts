import { MoviesService } from "./../services/movies.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { Movie } from "../services/movie.service";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
  movies: Array<any>;
  tooltipClicked: Array<boolean>;
  user: User;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private angularFire: AngularFireAuth
  ) {
    this.movies = this.moviesService.getMovies();

    angularFire.authState.subscribe(user => {
      this.user = user;

      this.tooltipClicked = new Array(this.movies.length);
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
}
