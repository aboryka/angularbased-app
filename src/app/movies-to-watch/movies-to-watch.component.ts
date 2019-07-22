import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { User } from 'firebase';

@Component({
  selector: 'app-movies-to-watch',
  templateUrl: './movies-to-watch.component.html',
  styleUrls: ['./movies-to-watch.component.css']
})
export class MoviesToWatchComponent {

  user: User;
  moviesToWatch = [];
  constructor(private moviesService: MoviesService, private angularFire: AngularFireAuth) {
    this.moviesService.getMoviesToWatchObs().subscribe((movies: Array<any>) => {
      this.moviesToWatch = movies;
    })

    angularFire.authState.subscribe(user => {
      this.user = user;
    })
  }


  removeFromWatchList(movie: Array<any>): void {
    this.moviesService.removeFromWatchList(movie);
  }

}
