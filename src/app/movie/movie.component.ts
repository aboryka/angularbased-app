import { Component, OnInit } from "@angular/core";
import { MovieService, Movie } from "../services/movie.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"]
})
export class MovieComponent implements OnInit {
  movie: Movie;
  ngOnInit() {
    this.route.paramMap.subscribe((param: Params) => {
      this.movie = this.movieService.getMovieById(param.get('id'));
    });
  }

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
}
