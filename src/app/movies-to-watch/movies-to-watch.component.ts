import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies-to-watch',
  templateUrl: './movies-to-watch.component.html',
  styleUrls: ['./movies-to-watch.component.css']
})
export class MoviesToWatchComponent implements OnInit {

  moviesToWatch = [];
  constructor(private moviesService: MoviesService) {
    this.moviesService.getMoviesToWatchObs().subscribe((movies: Array<any>) => {
      this.moviesToWatch = movies;
    })
  }

  removeFromWatchList(movie: Array<any>): void {
    this.moviesService.removeFromWatchList(movie);
  }
  ngOnInit() {
  }

}
