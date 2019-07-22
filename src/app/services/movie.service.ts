import { MoviesService } from "./movies.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class MovieService {
  movies: Array<Movie>;
  constructor(private moviesService: MoviesService) {
      this.movies = this.moviesService.getMovies();
  }

  getMovieById(id: any): Movie {
    return this.movies.find(m => m.id === id);
  }

  getMovie(): Observable<Array<Movie>>{
    return of(this.movies);
  }
}

export class Movie {
  constructor(
    public id: string,
    public title: string,
    public times: Array<any>,
    public filmLength: string,
    public description: string,
    public filmGenre: Array<string>,
    public actors: Array<string>,
    public director: string,
    public scenario: Array<string>
  ) {}
}
