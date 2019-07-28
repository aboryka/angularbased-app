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
  watchListClicked: Array<boolean>;
  user: User;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private angularFire: AngularFireAuth
  ) {
    this.movies = this.moviesService.getMovies();

    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.moviesService.sortByTime();
    this.watchListClicked = new Array(this.movies.length);
  }

  addToWatchList(movie: string, elemIndex: number): void {
    this.watchListClicked[elemIndex] = true;

    const tooltip = <HTMLElement>(
      document.getElementsByClassName("c-movies__tooltip--show")[elemIndex]
    );
    this.removeWatchListBtnTooltip(tooltip).then(() => {
      this.resetWatchListBtn(tooltip, elemIndex);
    });

    if (this.user) {
      this.moviesService.addToWatchList(movie);
    }
  }

  resetWatchListBtn(tooltip: HTMLElement, elemIndex: number) {
    setTimeout(() => {
      this.watchListClicked[elemIndex] = false;
      tooltip.classList.remove("c-movies__tooltip--hide");
    }, 400);
  }

  removeWatchListBtnTooltip(tooltip: HTMLElement) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        tooltip.classList.add("c-movies__tooltip--hide");
        resolve(tooltip);
      }, 300);
    });
  }
  showDetails(id: string) {
    this.router.navigate(["/movies", id]);
  }
}
