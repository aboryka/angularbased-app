import { MoviesService } from './../services/movies.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(private moviesService: MoviesService) { }

  movies: Array<any> = this.moviesService.movies;

}
