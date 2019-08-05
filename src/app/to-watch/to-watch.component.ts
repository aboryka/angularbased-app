import { Component, OnInit, OnDestroy, AfterContentChecked, AfterViewChecked} from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Subscription } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-to-watch',
  templateUrl: './to-watch.component.html',
  styleUrls: ['./to-watch.component.scss']
})
export class ToWatchComponent implements OnInit, OnDestroy {


  ngOnDestroy(): void {
    console.log(this.subscription)
    this.subscription.unsubscribe();
  }

  user: User;
  movies: Array<any> = [];
  subscription: Subscription;

  constructor(private moviesService: MoviesService, private angularFire: AngularFireAuth) {
    this.subscription = this.angularFire.authState.subscribe(user => {
      this.user = user;

      if (user) {
        this.subscription = this.moviesService
          .getMoviesToWatchObs()
          .subscribe((movies: Array<any>) => {
            this.movies = movies;
          });
      }

    });
  }
  ngOnInit(): void {
    console.log(this.user)

  }



}
